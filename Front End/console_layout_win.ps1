$topl = ([char]0x2554)
$topm = ([char]0x2566)
$topr = ([char]0x2557)

$botl = ([char]0x255A)
$botm = ([char]0x2569)
$botr = ([char]0x255D)

$lefm = ([char]0x2560)
$rigm = ([char]0x2563)

$tpbt = ([char]0x2550)
$lfrt = ([char]0x2551)

$midd = ([char]0x256C)

$topbottomrep = $tpbt + $tpbt + $tpbt + $tpbt + $tpbt + $tpbt + $tpbt + $tpbt + $tpbt + $tpbt + $tpbt
$topbottomrepm = $topbottomrep + $tpbt + $topbottomrep + $tpbt + $tpbt + $tpbt + $tpbt + $tpbt + $tpbt + $tpbt + $tpbt

function MainControl {
    # Width = 121
    # Height = 11

    Write-Output control:

    $topl + $topbottomrep + $topm + $topbottomrep + $topm + $topbottomrep + $topm + $topbottomrep + $topm + $topbottomrep + $topm + $topbottomrep + $topm + $topbottomrep + $topm + $topbottomrep + $topm + $topbottomrep + $topm + $topbottomrep + $topr
    $lfrt + " Monster 1 " + $lfrt + " Monster 2 " + $lfrt + " Monster 3 " + $lfrt + " Monster 4 " + $lfrt + " Monster 5 " + $lfrt + " Monster 6 " + $lfrt + " Monster 7 " + $lfrt + " Monster 8 " + $lfrt + " Monster 9 " + $lfrt + " Monster10 " + $lfrt
    $lefm + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $rigm
    $lfrt + "   Power   " + $lfrt + "   Power   " + $lfrt + "   Power   " + $lfrt + "   Power   " + $lfrt + "   Power   " + $lfrt + "   Power   " + $lfrt + "   Power   " + $lfrt + "   Power   " + $lfrt + "   Power   " + $lfrt + "   Power   " + $lfrt
    $lefm + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $rigm
    $lfrt + "  Activate " + $lfrt + "  Activate " + $lfrt + "  Activate " + $lfrt + "  Activate " + $lfrt + "  Activate " + $lfrt + "  Activate " + $lfrt + "  Activate " + $lfrt + "  Activate " + $lfrt + "  Activate " + $lfrt + "  Activate " + $lfrt
    $lefm + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $rigm
    $lfrt + " Alt. Act. " + $lfrt + " Alt. Act. " + $lfrt + " Alt. Act. " + $lfrt + " Alt. Act. " + $lfrt + " Alt. Act. " + $lfrt + " Alt. Act. " + $lfrt + " Alt. Act. " + $lfrt + " Alt. Act. " + $lfrt + " Alt. Act. " + $lfrt + " Alt. Act. " + $lfrt
    $lefm + $topbottomrep + $botm + $topbottomrep + $botm + $topbottomrep + $botm + $topbottomrep + $botm + $topbottomrep + $botm + $topbottomrep + $botm + $topbottomrep + $botm + $topbottomrep + $midd + $topbottomrep + $midd + $topbottomrep + $rigm
    $lfrt + "                                                                                               " + $lfrt + "    Door   " + $lfrt + "  Garbage  " + $lfrt
    $botl + $topbottomrep + $tpbt + $topbottomrep + $tpbt + $topbottomrep + $tpbt + $topbottomrep + $tpbt + $topbottomrep + $tpbt + $topbottomrep + $tpbt + $topbottomrep + $tpbt + $topbottomrep + $botm + $topbottomrep + $botm + $topbottomrep + $botr
}

function Settings {
    # Width = 33
    # Height = 9

    Write-Output settings:

    $topl + $topbottomrepm + $topr
    $lfrt + "           R E S E T  (Enter)  " + $lfrt
    $lefm + $topbottomrepm + $rigm
    $lfrt + "  Key Guide (=): On            " + $lfrt
    $lfrt + "  Key Guide (=): Off           " + $lfrt
    $lefm + $topbottomrepm + $rigm
    $lfrt + " GUI Update (-): Instant       " + $lfrt
    $lfrt + " GUI Update (-): Wait for data " + $lfrt
    $botl + $topbottomrepm + $botr
}

function Help {
    # Width = 64
    # Height = 12

    Write-Output help:

    $topl + $topbottomrepm + $topbottomrepm + $topr
    $lfrt + " Change name:  1   2   3   4   5   6   7   8   9   0          " + $lfrt
    $lfrt + "       Power:  Q   W   E   R   T   Y   U   I   O   P          " + $lfrt
    $lfrt + "    Activate:  A   S   D   F   G   H   J   K   L   ;          " + $lfrt
    $lfrt + "   Alt. Act.:  Z   X   C   V   B   N   M   ,   .   /          " + $lfrt
    $lfrt + "        Door:  The Space button (trigger)                     " + $lfrt
    $lfrt + "     Garbage:  ' (apostraphe)                                 " + $lfrt
    $lfrt + "                                                              " + $lfrt
    $lfrt + " When the Key Guide setting is On, the control screen will    " + $lfrt
    $lfrt + " show P for Power, A for Activate, X for Alternate Activate,  " + $lfrt
    $lfrt + " D for Door, and G for Garbage.                               " + $lfrt
    $botl + $topbottomrepm + $topbottomrepm + $botr
}

[console]::WindowWidth = 121
[console]::WindowHeight = 36
[console]::BufferWidth = 121
[console]::BufferHeight = 36

MainControl
Settings
Help

pause