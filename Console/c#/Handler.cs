using System.Diagnostics;
using System.Threading.Channels;

namespace MonsterController
{
	internal static class Handler
	{
		private const byte Major = 0;
		private const byte Minor = 1;
		private const byte Revision = 0;
		private const string Language = "C#.NET";

		internal static bool run = true;

		private static void ControlPart(Frontend frontend, bool[] monsts)
		{
			frontend.UpdateControl(monsts);
		}

		private static void SettingsPart(Frontend frontend)
		{
			frontend.UpdateSettings();
		}

		private static void HelpPart(Frontend frontend)
		{
			frontend.UpdateHelp();
			while (Console.ReadKey().Key != ConsoleKey.Escape) { }
		}

		private static int Main()
		{
			AppDomain.CurrentDomain.UnhandledException += (sender, e) =>
			{
				Console.WriteLine($"{e.ExceptionObject}");
				if (!e.IsTerminating)
				{
					Process.GetCurrentProcess().Kill();
				}
			};

			Console.Write("\x1b[38;2;255;0;0m");
			Console.WriteLine($"Monster Controller v{Major}.{Minor}.{Revision} {Language} Console");

			Channel<ushort> channelToBackend = Channel.CreateUnbounded<ushort>(new() { SingleReader = true, SingleWriter = true, AllowSynchronousContinuations = true });
			Channel<ushort> channelToFrontend = Channel.CreateUnbounded<ushort>(new() { SingleReader = true, SingleWriter = true, AllowSynchronousContinuations = true });

			ChannelWriter<ushort> toBackend = channelToBackend.Writer;
			ChannelReader<ushort> fromBackend = channelToFrontend.Reader;
			ChannelWriter<ushort> toFrontend = channelToFrontend.Writer;
			ChannelReader<ushort> fromFrontend = channelToBackend.Reader;

			Backend backend = new(toFrontend, fromFrontend);
			Frontend frontend = new(toBackend, fromBackend);

			bool[] monsts = [
				false, false, false, false, false, false, false, false, false, false, false, false, false,
				false, false, false, false, false, false, false, false, false, false, false, false, false,
				false, false, false, false, false, false,
			];

			while (true)
			{
				switch (frontend.Menu())
				{
					case Frontend.Screen.Control:
						ControlPart(frontend, monsts);
						break;
					case Frontend.Screen.Settings:
						SettingsPart(frontend);
						break;
					case Frontend.Screen.Help:
						HelpPart(frontend);
						break;
					case Frontend.Screen.MenuExit:
						run = false;
						frontend.Exit();
						backend.Exit();
						return 0;
				}
			}
		}
	}
}