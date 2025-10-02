using System.Diagnostics;
using System.Threading.Channels;

namespace MonsterController
{
	internal class Frontend
	{
		internal enum Screen
		{
			MenuExit,
			Control,
			Settings,
			Help,
		}

		private const string TOPL = "\u2554";
		private const string TOPM = "\u2566";
		private const string TOPR = "\u2557";

		private const string BOTL = "\u255A";
		private const string BOTM = "\u2569";
		private const string BOTR = "\u255D";

		private const string LEFM = "\u2560";
		private const string RIGM = "\u2563";

		private const string TPBT = "\u2550";
		private const string LFRT = "\u2551";

		private const string MIDD = "\u256C";

		private const string TOPBOTTOMREP = TPBT + TPBT + TPBT + TPBT + TPBT + TPBT + TPBT + TPBT + TPBT + TPBT + TPBT;
		private const string TOPBOTTOMREPM = TOPBOTTOMREP + TPBT + TOPBOTTOMREP + TPBT + TPBT + TPBT + TPBT + TPBT + TPBT + TPBT + TPBT;

		private readonly ChannelWriter<ushort> toBackend;
		private readonly ChannelReader<ushort> fromBackend;

		private Screen screen = Screen.MenuExit;
		private byte connectState = 0;

		private string[] names = ["Monster 1", "Monster 2", "Monster 3", "Monster 4", "Monster 5", "Monster 6", "Monster 7", "Monster 8", "Monster 9", "Monster10"];

		/// <summary>
		/// Also named the "Init" function.
		/// </summary>
		public Frontend(ChannelWriter<ushort> toBackend, ChannelReader<ushort> fromBackend)
		{
			this.toBackend = toBackend;
			this.fromBackend = fromBackend;

			new Thread(async () =>
			{
				while (Handler.run)
				{
					ushort d = await this.fromBackend.ReadAsync();

					switch (d & 0xFF)
					{
						case 3:
							continue;
						default:
							connectState = (byte)d;
							break;
					}

					switch (screen)
					{
						case Screen.Control:

							break;
						case Screen.Settings:
							break;
					}
				}
			})
			{ IsBackground = true }.Start();
		}

		public void Exit()
		{
			Console.Write("\x1b[39m\x1b[49m");
		}

		public Screen Menu()
		{
			switch (screen)
			{
				case Screen.Control:
					for (int i = 0; i < 11; i++)
					{
						Console.Write("\x1b[1A");
						Console.Write("\x1b[K");
					}
					break;
				case Screen.Settings:
					for (int i = 0; i < 7; i++)
					{
						Console.Write("\x1b[1A");
						Console.Write("\x1b[K");
					}
					break;
				case Screen.Help:
					for (int i = 0; i < 12; i++)
					{
						Console.Write("\x1b[1A");
						Console.Write("\x1b[K");
					}
					break;
				case Screen.MenuExit:
					break;
			}
			screen = Screen.MenuExit;
			byte sel = 0;
			while (true)
			{
				Console.WriteLine($"{(sel == 0 ? ">" : " ")} Control {(sel == 0 ? "<" : " ")}");
				Console.WriteLine($"{(sel == 1 ? ">" : " ")} Settings {(sel == 1 ? "<" : " ")}");
				Console.WriteLine($"{(sel == 2 ? ">" : " ")} Help {(sel == 2 ? "<" : " ")}");
				Console.WriteLine($"{(sel == 3 ? ">" : " ")} Exit {(sel == 3 ? "<" : " ")}");

				ConsoleKeyInfo cki = Console.ReadKey();

				switch (cki.Key)
				{
					case ConsoleKey.UpArrow:
						if (sel != 0)
						{
							sel--;
						}
						break;
					case ConsoleKey.DownArrow:
						if (sel != 3)
						{
							sel++;
						}
						break;
					case ConsoleKey.Enter:
						return sel switch
						{
							0 => Screen.Control,
							1 => Screen.Settings,
							2 => Screen.Help,
							3 => Screen.MenuExit,
							_ => throw new UnreachableException($"value 'sel' of {sel} unexpected"),
						};
					default:
						break;
				}
				Console.Write("\x1b[4A");
			}
		}

		public void UpdateControl(bool[] monsts)
		{
			if (screen == Screen.MenuExit)
			{
				Console.Write("\x1b[4A");
				screen = Screen.Control;
			}
		}

		public void UpdateSettings()
		{
			if (screen == Screen.MenuExit)
			{
				Console.Write("\x1b[4A");
				screen = Screen.Settings;
			}

			if (connectState)
		}

		public void UpdateHelp()
		{
			Console.Write("\x1b[4A");
			screen = Screen.Help;

			Console.WriteLine($"{TOPL}{TOPBOTTOMREPM}{TOPBOTTOMREPM}{TOPR}");
			Console.WriteLine($"{LFRT} Change name:  1   2   3   4   5   6   7   8   9   0          {LFRT}");
			Console.WriteLine($"{LFRT}       Power:  Q   W   E   R   T   Y   U   I   O   P          {LFRT}");
			Console.WriteLine($"{LFRT}    Activate:  A   S   D   F   G   H   J   K   L   ;          {LFRT}");
			Console.WriteLine($"{LFRT}   Alt. Act.:  Z   X   C   V   B   N   M   ,   .   /          {LFRT}");
			Console.WriteLine($"{LFRT}        Door:  The Space button (trigger)                     {LFRT}");
			Console.WriteLine($"{LFRT}     Garbage:  ' (apostraphe)                                 {LFRT}");
			Console.WriteLine($"{LFRT}                                                              {LFRT}");
			Console.WriteLine($"{LFRT} When the Key Guide setting is On, the control screen will    {LFRT}");
			Console.WriteLine($"{LFRT} show P for Power, A for Activate, X for Alternate Activate,  {LFRT}");
			Console.WriteLine($"{LFRT} D for Door, and G for Garbage.                               {LFRT}");
			Console.WriteLine($"{BOTL}{TOPBOTTOMREPM}{TOPBOTTOMREPM}{BOTR}");
		}
	}
}