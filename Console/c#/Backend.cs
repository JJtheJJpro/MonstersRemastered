using System.IO.Ports;
using System.Management;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Channels;

namespace MonsterController
{
	internal partial class Backend
	{
		public enum Status
		{
			Disconnected,
			Connecting,
			Connected,
			Data,
		}

		private SerialPort? sp;
		private readonly ChannelWriter<ushort> toFrontend;
		private readonly ChannelReader<ushort> fromFrontend;

		public Backend(ChannelWriter<ushort> toFrontend, ChannelReader<ushort> fromFrontend)
		{
			this.toFrontend = toFrontend;
			this.fromFrontend = fromFrontend;

			new Thread(async () =>
			{
				while (Handler.run)
				{
					string? name = ArduinoPortName();

					if (name != null)
					{
						await this.toFrontend.WriteAsync((ushort)Status.Connecting);
						sp = new(name, 9600)
						{
							DtrEnable = true
						};
						sp.Open();
						_ = sp.ReadByte();
						await this.toFrontend.WriteAsync((ushort)Status.Connected);
						while (sp.IsOpen)
						{
							try
							{
								int bc = sp.ReadByte();
								if (bc != -1)
								{
									ushort b = (byte)bc;
									await this.toFrontend.WriteAsync((ushort)((short)Status.Data | (b << 8)));
								}
							}
							catch (IOException)
							{
								continue;
							}
						}
					}

					if (!Handler.run)
					{
						break;
					}

					await this.toFrontend.WriteAsync((ushort)Status.Disconnected);

					#region Listen for USB plug in
					//Console.WriteLine("Waiting for USB...");
					if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
					{
						WqlEventQuery _query = new("SELECT * FROM Win32_DeviceChangeEvent WHERE EventType=2");
						ManagementEventWatcher watcher = new(_query);
						_ = watcher.WaitForNextEvent();
					}
					else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
					{

					}
					#endregion
				}

			})
			{ IsBackground = true }.Start();
			new Thread(async () =>
			{
				while (Handler.run)
				{
					uint v = await this.fromFrontend.ReadAsync();
					switch (v)
					{
						case 0:
							if (sp != null && sp.IsOpen)
							{
								sp.Close();
							}
							Handler.run = false;
							break;
					}
				}
			})
			{ IsBackground = false }.Start();
		}

		public void Exit()
		{
			if (sp != null && sp.IsOpen)
			{
				sp.Close();
			}
		}

		// at this point, it's just api stuff for C#

		private static string? ArduinoPortName()
		{
			if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
			{
				foreach (string name in SerialPort.GetPortNames())
				{
					string? hwid = GetHardwareId(name);
					if (hwid == null)
					{
						continue;
					}
					Match m = MyRegex().Match(hwid);
					if (m.Success && m.Groups[1].Value == "2341" && m.Groups[2].Value == "0042")
					{
						return name;
					}
				}
			}

			return null;
		}

		/// <summary>
		/// Returns the hardware ID string (e.g. "USB\VID_0403&amp;PID_6001&amp;…")
		/// for the COM port (e.g. "COM3"), or null if not found.
		/// </summary>
		public static string? GetHardwareId(string comPortName)
		{
			Guid copy1 = GUID_DEVINTERFACE_COMPORT;
			// 1) Get the device info set for all present COM‐port interfaces
			IntPtr deviceInfoSet = SetupDiGetClassDevs(
				ref copy1,
				IntPtr.Zero,
				IntPtr.Zero,
				DIGCF_PRESENT | DIGCF_DEVICEINTERFACE
			);
			if (deviceInfoSet == IntPtr.Zero || deviceInfoSet.ToInt64() == -1)
			{
				return null;
			}

			try
			{
				var interfaceData = new SP_DEVICE_INTERFACE_DATA();
				interfaceData.cbSize = Marshal.SizeOf(interfaceData);

				int index = 0;
				while (true)
				{
					Guid copy2 = GUID_DEVINTERFACE_COMPORT;
					bool success = SetupDiEnumDeviceInterfaces(
						deviceInfoSet,
						IntPtr.Zero,
						ref copy2,
						index,
						ref interfaceData
					);
					if (!success)
					{
						// No more interfaces
						break;
					}

					// First call to get required buffer size
					SetupDiGetDeviceInterfaceDetail(
						deviceInfoSet,
						ref interfaceData,
						IntPtr.Zero,
						0,
						out int requiredSize,
						IntPtr.Zero
					);

					// Prepare the detail structure
					SP_DEVICE_INTERFACE_DETAIL_DATA detailData = new()
					{
						// On 64-bit Windows, cbSize must be 8; on 32-bit, cbSize must be 6.
						// However, in .NET you can usually do:
						cbSize = IntPtr.Size == 8
							? 8
							: 5 + Marshal.SystemDefaultCharSize // 5 + 1 on x86
					};
					// Or simply:
					// detailData.cbSize = Marshal.SizeOf(typeof(SetupApi.SP_DEVICE_INTERFACE_DETAIL_DATA));

					var devInfoData = new SP_DEVINFO_DATA
					{
						cbSize = Marshal.SizeOf<SP_DEVINFO_DATA>()
					};

					var buffer = new byte[requiredSize];
					// Copy the detailData struct into the start of buffer so the API can fill in DevicePath
					var rawDetailData = GCHandle.Alloc(buffer, GCHandleType.Pinned);
					try
					{
						IntPtr ptr = rawDetailData.AddrOfPinnedObject();
						Marshal.StructureToPtr(detailData, ptr, false);
					}
					finally
					{
						rawDetailData.Free();
					}

					// Second call to retrieve SP_DEVICE_INTERFACE_DETAIL_DATA and SP_DEVINFO_DATA
					bool ok = SetupDiGetDeviceInterfaceDetail(
						deviceInfoSet,
						ref interfaceData,
						ref detailData,
						requiredSize,
						out _,
						ref devInfoData
					);

					if (ok)
					{
						// detailData.DevicePath is the “\\?\…&GUID…” path
						// Now we want to check if this interface is our “COMx”
						//string devicePath = detailData.DevicePath;

						// To verify which COMx this is, read the “friendly name” from the registry:
						// Actually, the registry property SPDRP_FRIENDLYNAME (0x0000000C) or
						// SPDRP_DEVICEDESC (0x00000000) is often “USB-Serial Controller (COM3)”.
						// But for simplicity, we can call SetupDiGetDeviceRegistryProperty for SPDRP_FRIENDLYNAME.

						// (If you want to compare by DevicePath, you can also open the
						// corresponding `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Enum\…\Device Parameters\PortName`
						// but that is more code.)

						// For demonstration, let's just retrieve the HARDWAREID for this devInfoData:
						// First call to get required size:
						SetupDiGetDeviceRegistryProperty(
							deviceInfoSet,
							ref devInfoData,
							SPDRP_HARDWAREID,
							out _,
							null,
							0,
							out int requiredSize2
						);

						if (requiredSize2 > 0)
						{
							var hwidBuffer = new byte[requiredSize2];
							bool ok2 = SetupDiGetDeviceRegistryProperty(
								deviceInfoSet,
								ref devInfoData,
								SPDRP_HARDWAREID,
								out _,
								hwidBuffer,
								requiredSize2,
								out _
							);

							if (ok2)
							{
								// The HARDWAREID property is stored as a REG_MULTI_SZ (multiple null-terminated strings).
								// We can marshal it into managed strings by scanning for '\0\0'.
								string all = Encoding.UTF8.GetString(hwidBuffer);
								// Split on double-null to get each entry
								var parts = all
									.TrimEnd('\0')
									.Split(['\0'], StringSplitOptions.RemoveEmptyEntries);
								// e.g. parts might be:
								//   [ "USB\\VID_0403&PID_6001&REV_0100", "USB\\VID_0403&PID_6001", ... ]

								// Now—how do we know which COM port this is? We need to check the “PortName”
								// registry value (e.g. "COM3") under the same DevInst. That is under:
								//   HKLM\SYSTEM\CurrentControlSet\Enum\<DeviceInstancePath>\Device Parameters\PortName
								// But devInfoData.DevInst (an integer) isn't directly the registry path.
								// So at this point, a quick approach is to look at one of the “parts” and
								// compare it to something you already know, or do a second SetupDi call for
								// SPDRP_FRIENDLYNAME and see if it contains “(COM3)”.

								// Let’s do that: fetch SPDRP_FRIENDLYNAME and see if it contains our comPortName.
								// SPDRP_FRIENDLYNAME = 0x0000000C

								SetupDiGetDeviceRegistryProperty(
									deviceInfoSet,
									ref devInfoData,
									0x0000000C, // SPDRP_FRIENDLYNAME
									out _,
									null,
									0,
									out int reqSize3
								);

								if (reqSize3 > 0)
								{
									var fnBuffer = new byte[reqSize3];
									bool ok3 = SetupDiGetDeviceRegistryProperty(
										deviceInfoSet,
										ref devInfoData,
										0x0000000C,
										out _,
										fnBuffer,
										reqSize3,
										out _
									);
									if (ok3)
									{
										string friendlyName = Encoding.UTF8.GetString(fnBuffer).TrimEnd('\0');
										// Example: "USB-Serial Controller (COM3)"
										if (friendlyName != null && friendlyName.Contains($"({comPortName})"))
										{
											// This interface is indeed our COM3. Return the first HWID.
											return parts.Length > 0 ? parts[0] : null;
										}
									}
								}
							}
						}
					}

					index++;
				}
			}
			finally
			{
				SetupDiDestroyDeviceInfoList(deviceInfoSet);
			}

			// Not found
			return null;
		}

		// ---------------------------------------------
		// Constants & GUIDs
		// ---------------------------------------------

		// GUID_DEVINTERFACE_COMPORT = {86E0D1E0-8089-11D0-9CE4-08003E301F73}
		public static readonly Guid GUID_DEVINTERFACE_COMPORT = new(
			0x86E0D1E0, 0x8089, 0x11D0,
			0x9C, 0xE4, 0x08, 0x00, 0x3E, 0x30, 0x1F, 0x73);

		public const int DIGCF_PRESENT = 0x00000002;
		public const int DIGCF_DEVICEINTERFACE = 0x00000010;

		public const int SPDRP_HARDWAREID = 0x00000001;

		// ---------------------------------------------
		// Structures
		// ---------------------------------------------
		[StructLayout(LayoutKind.Sequential)]
		public struct SP_DEVICE_INTERFACE_DATA
		{
			public int cbSize;
			public Guid InterfaceClassGuid;
			public int Flags;
			public IntPtr Reserved;
		}

		[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
		public struct SP_DEVICE_INTERFACE_DETAIL_DATA
		{
			public int cbSize;
			[MarshalAs(UnmanagedType.ByValTStr, SizeConst = 256)]
			public string DevicePath;
		}

		[StructLayout(LayoutKind.Sequential)]
		public struct SP_DEVINFO_DATA
		{
			public int cbSize;
			public Guid ClassGuid;
			public int DevInst;
			public IntPtr Reserved;
		}

		// ---------------------------------------------
		// P/Invoke Signatures
		// ---------------------------------------------
		[DllImport("setupapi.dll", SetLastError = true)]
		public static extern IntPtr SetupDiGetClassDevs(
			ref Guid ClassGuid,
			IntPtr Enumerator,
			IntPtr hwndParent,
			int Flags
		);

		[DllImport("setupapi.dll", SetLastError = true)]
		[return: MarshalAs(UnmanagedType.Bool)]
		public static extern bool SetupDiEnumDeviceInterfaces(
			IntPtr DeviceInfoSet,
			IntPtr DeviceInfoData,
			ref Guid InterfaceClassGuid,
			int MemberIndex,
			ref SP_DEVICE_INTERFACE_DATA DeviceInterfaceData
		);

		[DllImport("setupapi.dll", SetLastError = true, CharSet = CharSet.Auto)]
		public static extern bool SetupDiGetDeviceInterfaceDetail(
			IntPtr DeviceInfoSet,
			ref SP_DEVICE_INTERFACE_DATA DeviceInterfaceData,
			IntPtr DeviceInterfaceDetailData,
			int DeviceInterfaceDetailDataSize,
			out int RequiredSize,
			IntPtr DeviceInfoData
		);

		[DllImport("setupapi.dll", SetLastError = true, CharSet = CharSet.Auto)]
		public static extern bool SetupDiGetDeviceInterfaceDetail(
			IntPtr DeviceInfoSet,
			ref SP_DEVICE_INTERFACE_DATA DeviceInterfaceData,
			ref SP_DEVICE_INTERFACE_DETAIL_DATA DeviceInterfaceDetailData,
			int DeviceInterfaceDetailDataSize,
			out int RequiredSize,
			ref SP_DEVINFO_DATA DeviceInfoData
		);

		[DllImport("setupapi.dll", SetLastError = true)]
		public static extern bool SetupDiGetDeviceRegistryProperty(
			IntPtr DeviceInfoSet,
			ref SP_DEVINFO_DATA DeviceInfoData,
			int Property,
			out int PropertyRegDataType,
			byte[]? PropertyBuffer,
			int PropertyBufferSize,
			out int RequiredSize
		);

		[DllImport("setupapi.dll", SetLastError = true)]
		public static extern bool SetupDiDestroyDeviceInfoList(
			IntPtr DeviceInfoSet
		);

		[GeneratedRegex(@"VID_([0-9A-F]{4})&PID_([0-9A-F]{4})")]
		private static partial Regex MyRegex();
	}
}
