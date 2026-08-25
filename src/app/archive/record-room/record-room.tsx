"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import styles from "./record-room.module.css";

type Track = {
  no: number;
  title: string;
  coverId: string;
  audioId: string;
  note: string;
  lyrics: string;
};

const tracks: Track[] = [
  {
    no: 1,
    title: "Good Morning, Frankston",
    coverId: "1wO1BEMjy8Rab935Hr4W0qt-QqIW4NDos",
    audioId: "15O6esLb6V91jGSkJZBtByX0H7bxo9R9C",
    note: "The whole machine begins with shutters, rain and one ordinary greeting.",
    lyrics: `[Distant voices]\nMorning, Frankston...\nMorning again...\n\n[Verse 1]\nShutters up at half-past eight,\nBroom on brick and rust on gate,\nSame old gull upon the sign,\nSame old bloke who's never on time.\n\nMrs. Kelly takes her chair,\nSwears that building wasn't there.\nKids cut through the morning rain—\nDifferent day, the same old game.\n\n[Lift]\nPaint gets covered, names come down,\nSomeone leaves, someone comes around.\nYears go missing, quick and slow—\nFunny what a street can know.\n\n[Chorus]\nGood morning, Frankston, how've you been?\nSame old bones in a changing skin.\nRaise the shutters, sweep the floor,\nSomeone's opening one more door.\nMorning, Frankston, passing through—\nHalf remembers, half is new.\nEverything changes...\nmostly.\n\n[Instrumental — three notes: CLINK, CLINK, CLINK]\n\n[Kid]\nMum... who's the monkey?\n\n[Mum]\nThat's ZIGGIE.\n\n[Kid]\nWhat's he do?\n\n[Silence]\n\n[ZIGGIE]\nMorning.\n\n[FULL BAND]\n\n[Final Chorus]\nGOOD MORNING, FRANKSTON!\nUP YOU GET!\nNOTHING'S FINISHED WITH US YET!\nRaise the curtain! Sweep the slate!\nAnother morning—\nanother fate!\n\nCLINK.`,
  },
  {
    no: 2,
    title: "The Old Vic State",
    coverId: "1CCuH444cwdjGMf1VHDQ7NJT110EcKe8l",
    audioId: "1vnmMRQXowqw9Tm_de0Nuw387Wm3AdF-H",
    note: "The first big grin: civic machinery as brass-band theatre.",
    lyrics: `[Brass — CLINK! CLINK! CLINK!]\n\n[ZIGGIE]\nStep right up, don't mind the queue,\nThere's always someone processing you.\nEvery door has seventeen keys—\nSixteen lost, one's overseas.\n\n[Clerks]\nName?\n\n[Citizen]\nIt's there.\n\n[Clerks]\nDate?\n\n[Citizen]\nRight there.\n\n[Clerks]\nPurpose of visit?\n\n[Citizen]\nYou sent me here!\n\n[Clerks]\nExcellent. Take a chair.\n\n[Pre-Chorus]\nOne desk!\nTwo stamps!\nFour hands!\nEight dates!\n\n[ALL]\nEverybody knows somebody\nwho can make you bloody wait!\n\n[CHORUS]\nSIGN IT!\nSTAMP IT!\nPASS THE PLATE!\nEverybody's somebody\nin the OLD VIC STATE!\n\nNAME IT!\nBLAME IT!\nRUN TOO LATE!\nGod save whoever's running\nthe OLD VIC STATE!\n\n[ZIGGIE]\nWe've got boards overseeing boards,\nLords who report to lesser lords,\nPlans for plans and schemes for schemes,\nMinutes recording previous meetings.\n\nIf nothing works, don't be distressed—\nWe'll form a panel to reassess.\nAnd if the panel disagrees—\n\n[CHOIR]\nA PANEL FOR THE PANEL, PLEASE!\n\n[Build]\nOne voice!\nTwo voices!\nFour!\nThen eight!\n\n[ALL]\nSING IT!\nSWING IT!\nLEGISLATE!\n\nRound and round and round we go,\nmagnificently late!\n\n[Bridge — suddenly elegant]\nRed tape makes a lovely bow\nwhen nobody remembers\nwhere it's meant to go.\n\n[ZIGGIE, spoken]\nVery distinguished.\n\n[FINAL CHORUS]\nSIGN IT!\nSTAMP IT!\nPASS THE PLATE!\nBuild another doorway\nthen debate about the gate!\n\nMAKE IT!\nBREAK IT!\nRENOVATE!\n\n[ALL]\nLONG MAY NOBODY QUITE CONTROL\nTHE OLD VIC STATE!\n\nCLINK! CLINK! CLINK!\n\n[Clerk, alone]\nNext.\n\n[Citizen]\nFinally.\n\n[Clerk]\nWrong form.`,
  },
  {
    no: 3,
    title: "Wrong Form",
    coverId: "1fHnS70BmoZbEnIbxIX5J4b7kg9m3YiX7",
    audioId: "1Urcwzs3YtTnU7JSM877VJy_jK9ia8MWe",
    note: "Recursion becomes rhythm; ZIGGIE solves the system by ignoring it.",
    lyrics: `[CLERK]\nWrong form.\n\n[Beat kicks in]\n\n[CITIZEN]\nI only want to plant a tree.\n\n[CLERK]\nThen Form Eleven-B.\n\n[CITIZEN]\nThey sent me here.\n\n[CLERK]\nWho?\n\n[CITIZEN]\nEleven-B.\n\n[CLERK]\n...Form Twenty-Three.\n\n[Groove]\nUp one floor!\nDown two flights!\nTake three copies—\nblack, not white!\n\nInitial here!\nPrint your name!\nDifferent office—\nmostly same!\n\n[CHORUS]\nWRONG FORM!\nRIGHT DESK!\nWRONG LINE!\nNEXT!\n\nStamp it, stack it, send it back,\nlose it somewhere in the rack!\n\nWRONG DOOR!\nRIGHT FLOOR!\nNOT OUR DEPARTMENT\nANYMORE!\n\n[CITIZEN]\nIt's just a tree!\n\n[ENSEMBLE]\nTHEN WHY'S IT SO COMPLICATED?!\n\n[CITIZEN]\nThat's what I'm asking!\n\n[ENSEMBLE]\nQUESTION NOT RELATED!\n\n[Verse 2]\nPlanning says Environment,\nEnvironment says Trees,\nTrees referred to Heritage,\nHeritage says “Please—\n\nprovide a documented history\nof proposed botanical use.”\n\n[CITIZEN]\nIt's a shrub.\n\n[CLERK]\nThen you've no excuse.\n\n[BUILD — overlapping]\nSign here!\nNot there!\nBlue pen!\nSquare four!\nWrong date!\nNew fee!\nForm B!\nID!\n\n[ALL]\nPLEASE HOLD!\n\n[Music freezes]\n\nFootsteps.\n\n[ZIGGIE]\nMorning.\n\nSCRAPE. DIG. PAT-PAT.\n\n[CITIZEN]\nDid you just plant it?\n\n[ZIGGIE]\nApparently.\n\n[CLERK]\nYOU CAN'T DO THAT!\n\n[ZIGGIE]\nBit late.\n\n[Tiny reprise]\nWrong form...\nright tree...\n\n[CLERK]\nWe'll need a committee.\n\nCLINK.`,
  },
  {
    no: 4,
    title: "There Is Another Procedure",
    coverId: "1G7qkbb1HV3fTliqE0RUsvI4pWkl6Scc-",
    audioId: "1oibKKNwEcXBEM749JSaDgsa6QNlU2s4D",
    note: "The jokes go cold. Procedure reveals an older ritual beneath procedure.",
    lyrics: `[CLINK... CLINK... CLINK...]\n\n[PREMIER]\nThe trains?\n\n[MINISTER]\nStopped.\n\n[PREMIER]\nThe House?\n\n[MINISTER]\nLocked.\n\n[TREASURER]\nThe numbers don't add up.\n\n[SECRETARY]\nThey never did.\n\n[Low strings enter]\n\n[PREMIER]\nThen follow procedure.\n\n[ALL]\nWe did.\n\n[PREMIER]\nAgain.\n\n[ALL]\nWe did.\n\n[PREMIER]\nThen follow the procedure\nfor when procedure fails!\n\n[Silence]\n\n[SECRETARY]\n...Sir.\n\nThere is another procedure.\n\n[VERSE]\nWhen rule contradicts rule,\nwhen law devours law,\nwhen every perfect answer\nfinds another fatal flaw—\n\nWhen the left hand signs the order\nthat the right hand must refuse,\nwhen every road is lawful\nbut there's no road left to choose—\n\n[CHOIR — whisper]\nThere is another procedure.\n\n[Build]\nUnder dust,\nunder seal,\nunder things we don't reveal,\n\nPast the minutes,\npast the names,\npast the governments and games—\n\n[SECRETARY]\nThere's a book beneath the book\nbeneath the book beneath the floor.\n\n[PREMIER]\nAnd what's it say?\n\n[SECRETARY]\nI don't know.\n\n[PREMIER]\nYou've never looked?\n\n[SECRETARY]\nWe never needed to before.\n\n[CHOIR]\nOPEN IT.\n\n[Pages turning]\n\n[SECRETARY]\n“When every avenue is closed,\nwhen every remedy has failed,\nwhen those entrusted with the wheel\ndiscover no one's steering—”\n\n[PREMIER]\nYes?!\n\n[SECRETARY]\nThere's one line.\n\n[Music drops to heartbeat]\n\n[SECRETARY]\n“Consult...\n\nthe Gentleman.”\n\n[PREMIER]\nWhat gentleman?\n\n[Faraway child's melody from Track 1]\n\n[SECRETARY]\nFrankston.\n\nCLINK.`,
  },
  {
    no: 5,
    title: "Nine Sharp",
    coverId: "1-pPbDDAxq4irlbhXk6mWpYUqGRoSN4to",
    audioId: "1KHFyY9d8zg-zLLpwhJ6DWg_D9cuGa5qz",
    note: "A sacred procession toward the least sacred revelation possible: business hours.",
    lyrics: `[Distant choir]\nFrankston...\n\n[PREMIER]\nBring the seal.\n\n[MINISTER]\nBring the books.\n\n[SECRETARY]\nBring the words no living minister has looked.\n\n[Procession begins]\n\nThrough sleeping streets and silver rain,\npast shuttered shops and midnight trains,\ncarry the question no law could name—\nsouth through the dark from whence we came.\n\n[CHOIR]\nCarry the seal!\nCarry the flame!\nCarry the burden nobody can name!\n\nStep after step,\nheart after heart,\nwhen reason has ended—\nwhere does faith start?\n\n[PREMIER]\nIf one hand remains\nwhen all others withdraw,\nif one voice stands higher\nthan custom or law—\n\nTonight let him answer.\nTonight let him speak.\n\n[SECRETARY]\nSir...\n\n[PREMIER]\nWhat?\n\n[SECRETARY]\nI think that's the street.\n\n[Music swells enormously]\n\nThere!\n\nBeneath one tired lamp.\n\nA silhouette.\n\nTop hat.\n\nTray.\n\n[ALL — whispered]\nThe Gentleman.\n\n[PREMIER]\nGuardian unseen!\nLast hand of the State!\nVictoria stands trembling\nbefore your gate!\n\nWe come without party,\nwithout rank, without pride—\n\n[ZIGGIE]\nWe're closed.\n\n[Everything stops]\n\n[PREMIER]\n...pardon?\n\n[ZIGGIE]\nClosed.\n\n[PREMIER]\nThe State may collapse before sunrise.\n\n[ZIGGIE]\nMmm.\n\n[Pocket watch opens]\n\nTick. Tick. Tick.\n\n[ZIGGIE]\nNine sharp.\n\n[One impossibly majestic orchestral chord]\n\n[CHOIR — reverently]\nNiiiiine... sharp.\n\n[ZIGGIE]\nDon't be late.\n\nCLICK.`,
  },
  {
    no: 6,
    title: "One Penny",
    coverId: "1F5J-DSK8lrSGFI9o95itY8cNK1pDfXof",
    audioId: "1oTvbj_38oGj3IjUgo9hU8eUmvRB1Cjiv",
    note: "The penny stops being a prop and becomes the absurd centre of gravity.",
    lyrics: `[Pocket watch]\nTick.\nTick.\nTick.\n\n[Door opens]\n\n[ZIGGIE]\nNine sharp.\n\n[PREMIER]\nNine sharp.\n\n[ZIGGIE]\nPenny.\n\n[PREMIER]\n...one?\n\n[ZIGGIE]\nOne.\n\n[CLINK.]\n\n[Verse 1]\nOne little circle,\ntwo little sides,\nall of our certainty\nbalanced inside.\n\nHeads for the promise,\ntails for the cost,\nfunny how choices look\nholy when lost.\n\n[MINISTERS — entering one by one]\nFor the trains—\n\nFor the courts—\n\nFor the books—\n\nFor the ports—\n\nFor the debts—\n\nFor the Crown—\n\nFor the ones looking up\nwhile we're looking down—\n\n[PREMIER]\nTell us the answer.\n\n[ZIGGIE]\nI haven't flipped it.\n\n[Silence]\n\n[Coin flicks upward]\n\n[CHOIR]\nRound and around and around and around—\n\nWhat goes up\nmust answer the ground.\n\nCall it fortune!\nCall it fate!\nCall it anything\nthat carries the weight!\n\n[BUILD]\nHeads, we're remembered!\nTails, we're condemned!\nHeads, we begin it!\nTails—\n\n[ZIGGIE]\nIt'll land in the end.\n\n[ALL]\nONE PENNY!\nONE MOMENT!\nONE TURN OF THE SKY!\n\nGive us a reason!\nGive us a sign!\n\nIf nobody knows\nwhere tomorrow should lie—\n\nLet something decide!\n\n[Coin falls]\n\nting...\n\n[Silence]\n\n[ZIGGIE]\nTails.\n\n[PREMIER — barely breathing]\nDear God.\n\n[ZIGGIE]\nSteady on.\n\n[PREMIER]\nWhat do we do?\n\n[ZIGGIE]\nTry left.\n\n[Three-beat pause]\n\nCLINK. CLINK. CLINK.\n\n[Brass detonates into Track 7]`,
  },
  {
    no: 7,
    title: "Puppet Master",
    coverId: "1inXxaCZsDVGuVV_lZ3IKgaiuPwV7NFIf",
    audioId: "1fberWVlJUS15Qg67Wqh-fyUounwLpTZl",
    note: "The false finale: maximum theatre, maximum certainty, one badly tangled tray.",
    lyrics: `[CLINK! CLINK! CLINK!]\n\n[FULL BAND]\n\n[ENSEMBLE]\nLEFT!\n\n[MINISTER]\nHe said left!\n\n[ALL]\nTHEN TURN THE BLOODY STATE LEFT!\n\n[Verse 1]\nRaise the curtain! Ring the bell!\nSomeone finally knows us well!\nCourts awaken! Engines start!\nEvery cog remembers its part!\n\nPull one thread—\na chamber sings!\nPull another—\nhear the bells ring!\n\n[Officials]\nIt cannot be chance!\n\n[Choir]\nIT MUST BE DESIGN!\n\n[ZIGGIE]\nI said “try left.”\n\n[ALL]\nA SIGN! A SIGN!\n\n[Pre-Chorus]\nWho knew the answer?\nWho knew the way?\nWho turned tomorrow\nwith one word today?\n\n[ALL]\nWHO PULLS THE LEVER?\n\nZIGGIE!\n\nWHO HOLDS THE STRING?\n\nZIGGIE!\n\nWHO MAKES THE MEN\nWHO THINK THEY'RE KINGS\nGET UP AND FUCKING SING?\n\nZIGGIE!\n\n[ZIGGIE]\nNow hang about—\n\n[ENSEMBLE]\nPUPPET MASTER!\nGENTLEMAN!\nHIDDEN HAND BEHIND THE PLAN!\n\nMASTER OF THE TURNING GATE!\nSECRET HEART\nOF THE OLD VIC STATE!\n\n[ZIGGIE — music shifts]\nYou built your towers,\nwrote your laws,\npolished every marble floor.\n\nMade a thousand little keys...\n\n[Band drops]\n\nThen lost\nthe fucking door.\n\n[MASSIVE RIFF]\n\nDon't make me master!\nDon't make me king!\nDon't build a bloody religion\nfrom an ordinary thing!\n\nYou begged for someone\nabove everything—\n\nI'm just the bastard\nholding the—\n\n[He looks down]\n\n...string.\n\n[Silence]\n\nWhy is there a string\non my tray?\n\n[Tiny tug]\n\n[Distant choir]\nPARLIAMENT ADJOURNED!\n\n[ZIGGIE]\nOh.\n\n[Another tug]\n\n[Choir]\nTRAINS TERMINATED!\n\n[ZIGGIE]\n...bloody things.`,
  },
  {
    no: 8,
    title: "Bloody Things",
    coverId: "1cVuMiUGWiGq9YSCFjx58bSgba5hcOD3K",
    audioId: "1rHBaW4boW1hKPEVyLVTVEsinvXm21uxP",
    note: "The grand conspiracy becomes a pub-floor knot of strings, springs and consequences.",
    lyrics: `[ZIGGIE]\n...bloody things.\n\n[Honky-tonk piano kicks in]\n\n[ZIGGIE]\nOne round the tray,\none round me shoe,\none disappears up Bourke Street too.\n\nThis one's marked COURTS,\nthis one's marked TRAINS—\n\nWho tied government\nto my bloody remains?\n\n[YANK!]\n\n[CHOIR, distant]\nPARLIAMENT ADJOURNED!\n\n[ZIGGIE]\nSorry!\n\n[YANK!]\n\n[CHOIR]\nMARKETS OVERTURNED!\n\n[ZIGGIE]\nWasn't me!\n\n[YANK!]\n\n[CHOIR]\nSOMEBODY'S BEEN ELECTED!\n\n[ZIGGIE]\nWho?\n\n[CHOIR]\nNOBODY EXPECTED!\n\n[Band]\nHEY!\n\n[Chorus]\nBLOODY THINGS!\nSTRINGS AND SPRINGS!\nWHO CONNECTED ME TO EVERYTHING?\n\nPull it once—\nthe bells all ring!\n\nPull it twice—\n\n[CHOIR]\nWE'VE LOST THE KING!\n\n[ZIGGIE]\nWe had a king?\n\n[CHOIR]\nFIGURE OF SPEECH!\n\n[ZIGGIE]\nFair enough.\n\n[Verse 2 — faster]\nThis one's tangled round a chair,\nthis one goes to God-knows-where.\n\nTREASURY?\nPLANNING?\nWATER?\nRATES?\n\nWhy's there one marked—\n\n[Squints]\n\n“OLD VIC STATE?”\n\n[ENSEMBLE]\nDON'T PULL THAT!\n\n[ZIGGIE]\nWhich?\n\n[ENSEMBLE]\nTHAT!\n\n[ZIGGIE]\nThis?\n\n[ENSEMBLE]\nYES!\n\n[ZIGGIE]\nRight.\n\n[YAAAAANK.]\n\n[Music instantly stops]\n\nNothing.\n\nNo choir.\n\nNo bells.\n\nNo traffic.\n\n[ZIGGIE]\n...hello?\n\n[Very distant voice]\nHello?\n\n[ZIGGIE]\nDid I do that?\n\n[Silence]\n\nCLINK...\n\nNo answer.`,
  },
  {
    no: 9,
    title: "Everything Stops",
    coverId: "17zunP0ya5G81qANqXE4yU1tvWfrwDBNm",
    audioId: "16_GTp6rpXsgPbtUZgDzLweLOBzS18iDR",
    note: "Near-zero. The album finally asks whether anyone was steering at all.",
    lyrics: `[Silence]\n\n[A distant tram bell.]\n\n...nothing.\n\n[MINISTER]\nHello?\n\n[SECRETARY]\nI'm here.\n\n[MINISTER]\nAre we sitting?\n\n[SECRETARY]\nI don't know.\n\n[MINISTER]\nWho's supposed to know?\n\n[SECRETARY]\n...I don't know.\n\n[One piano note]\n\n[Verse 1]\nNo wheel turning.\nNo gavel falling.\nNo clerk stamping.\nNo number calling.\n\nNo left.\nNo right.\nNo wrong.\nNo right.\n\nFunny how loud\nnothing gets at night.\n\n[Premier]\nIssue an order.\n\n[Minister]\nTo whom?\n\n[Premier]\nEveryone.\n\n[Minister]\nFrom whom?\n\n[Silence]\n\n[Low voices]\nWe blamed the hand.\nWe blamed the string.\n\nWe blamed the fool.\nWe blamed the king.\n\nWe drew a line\nfrom everything...\n\nto something.\n\nAnything.\n\nSomeone.\n\n[ZIGGIE]\nWasn't me.\n\n[Verse 2]\nMaybe the lever\nwas never attached.\n\nMaybe the lock\nnever needed a latch.\n\nMaybe we danced\nbecause somebody moved—\n\nOr maybe we danced\nbecause everyone assumed.\n\n[Fragment of OLD VIC STATE melody]\n\nSign it...\n\ndies.\n\nStamp it...\n\ndies.\n\nPass the—\n\nsilence.\n\n[PREMIER]\nSomeone finish it.\n\n[SECRETARY]\nWhy?\n\n[PREMIER]\nBecause that's how it goes.\n\n[SECRETARY]\nIs it?\n\n[Long pause]\n\n[ENSEMBLE — almost whispered]\nWhat if nobody\nwas controlling anything?\n\nWhat if nobody\never had?\n\nWhat if all those hands\nwere holding other hands\nbecause letting go\nfelt worse?\n\n[ZIGGIE]\nI only pulled a string.\n\n[Voice from shop, very distant]\nZIGGIE!\n\n[Everyone inhales]\n\nVOICE\nSTOP MUCKING AROUND\nAND BRING THAT TRAY IN!\n\n[ZIGGIE]\n...coming.\n\nFootsteps.\n\nDoor opens.\n\nDoor closes.\n\n[PREMIER]\nNow what?\n\n[SECRETARY]\nI suppose...\n\n[Tiny pulse begins]\n\n...we work it out.\n\n[PREMIER]\nOurselves?\n\n[SECRETARY]\nTerrifying, isn't it?\n\n[Two quiet notes seek the third.]\n\nThey never find it.`,
  },
  {
    no: 10,
    title: "Who Controls the Controller?",
    coverId: "1rKAxLPLKt8Kj8qTiohxsMTurt7jhslJU",
    audioId: "1L-sa8Dvy7vLaNkTBFmBA3n5tbx8yIkXq",
    note: "Humans survive uncertainty by immediately inventing a larger committee.",
    lyrics: `[Two unresolved notes from Track 9...]\n\n...CLINK!\n\n[BAND ERUPTS]\n\n[PREMIER]\nWAIT!\n\nIf ZIGGIE held the string—\n\n[MINISTER]\nWho handed him the string?\n\n[SECRETARY]\nAnd if somebody handed him the string—\n\n[ALL]\nWHO'S HANDLING THEM?!\n\n[Verse 1]\nIs it the Crown?\n\nNO!\n\nIs it the banks?\n\nNO!\n\nJudges in robes\nwith mysterious ranks?\n\nNO!\n\nThe press?\n\nNO!\n\nThe Lodge?\n\nNO!\n\n[ZIGGIE]\nHave you tried asking God?\n\n[ALL]\nNOT YET!\n\n[Chorus]\nWHO CONTROLS THE CONTROLLER\nCONTROLLING CONTROL?\n\nWHO AUDITS THE AUDITOR\nAUDITING THE WHOLE?\n\nWHO WATCHES THE WATCHER\nWATCHING THE WATCH?\n\nWHO CHECKED WHO CHECKED\nIF THE CHECKING WAS BOTCHED?\n\n[Verse 2 — faster]\nFollow the money!\n\nWHICH MONEY?\n\nFollow the trail!\n\nWHICH TRAIL?\n\nOpen the records!\n\nTHE RECORDS ARE STALE!\n\nQuestion the witness!\n\nWHICH WITNESS?\n\nThe man with the hat!\n\n[ZIGGIE]\nI'm literally standing\nright here, you twats.\n\n[Instrumental frenzy]\n\n[SECRETARY]\nI've drawn a diagram!\n\n[ALL]\nSHOW US!\n\n[SECRETARY]\nGovernment controls administration—\n\nAdministration controls regulation—\n\nRegulation controls implementation—\n\nImplementation controls—\n\n[PREMIER]\nGET TO THE TOP!\n\n[SECRETARY]\nThere isn't one.\n\n[Silence]\n\n[ALL]\n...make one.\n\n[DOUBLE-TIME]\nController! Controller!\nWho controls the controller?\n\nSupervisor! Supervisor!\nWho's supervising the supervisor?\n\nCommittee! Committee!\nWho appointed the committee?\n\n[CLERK]\nA committee!\n\n[ALL]\nWHICH COMMITTEE?!\n\n[CLERK]\nThe Committee for\nCommittee Accountability!\n\n[ALL]\nWHO WATCHES THEM?!\n\n[CLERK]\n...we do.\n\n[ALL]\nWHO WATCHES US?!\n\n[Music spirals upward]\n\n[PREMIER]\nSTOP!\n\nHaven't we sung this already?\n\n[CLERKS]\nYES!\n\n[PREMIER]\nThen why are we doing it again?!\n\n[CLERKS — enormous harmony]\nPROCEDUUUUURE!\n\n[Voice from shop]\nZIGGIE! Lunch!\n\n[Everything stops]\n\n[ZIGGIE]\nRighto.\n\n[PREMIER]\nWhere are you going?!\n\n[ZIGGIE]\nLunch.\n\n[PREMIER]\nBut who controls the State?!\n\n[ZIGGIE, walking away]\nDunno.\n\nTry the shrub bloke.\n\n[Door closes.]\n\n[Shrub bloke]\n...fuck off.`,
  },
  {
    no: 11,
    title: "Bit Ordinary",
    coverId: "1QsuKOzY7GZP6kUPniQCO7Jwc29fHbdav",
    audioId: "1ULmBvQ-k9l2JImKDgqRQnJyMvpmwTnnn",
    note: "The spectacle folds down to two figures, one street and the strange weight of staying.",
    lyrics: `[Evening street. Acoustic guitar.]\n\n[KID]\nZIGGIE?\n\n[ZIGGIE]\nMm?\n\n[KID]\nAre you important?\n\n[ZIGGIE]\nNot particularly.\n\n[Verse 1]\nSaw that corner change its name,\nthree new signs, the bricks stayed same.\nSaw old shops close, new ones start,\nwatched them paint right over someone's heart.\n\nSaw kids dragged in by Mum and Dad,\nswearing this was all they had.\nThen twenty years went wandering by—\nsame kids return with one beside.\n\n[KID]\nYou remember all that?\n\n[ZIGGIE]\nSome of it.\n\nSome gets better in the telling.\n\n[Chorus]\nBit ordinary, bit worn through,\nnothing much that history'd choose.\nNo grand palace, no parade,\njust little marks that people made.\n\nBit ordinary, rain and sun,\npeople leaving, people come.\nFunny thing, when years get long—\nordinary starts feeling like belonging.\n\n[Verse 2]\nI didn't build it.\nDidn't save it.\nNever owned a bloody thing.\n\nJust stood somewhere long enough\nto see what staying brings.\n\nNames disappear from windows,\nfaces disappear from streets.\nBut someone always says “good morning.”\nSomeone always sweeps.\n\n[KID]\nDoesn't it make you sad?\n\n[ZIGGIE]\nSometimes.\n\nWouldn't mean much if it couldn't.\n\n[Bridge]\nNothing stays.\n\n[KID]\nYou're still here.\n\n[ZIGGIE]\nFor now.\n\nNothing lasts.\n\n[KID]\nThat's a bit shit.\n\n[ZIGGIE laughs]\nThat's one way of putting it.\n\n[Final Chorus]\nBit ordinary, slightly strange,\nholding still while all things change.\nNo one notices the day\nsomething ordinary slips away.\n\nSo mind the faces.\nMind the names.\nMind the silly little games.\n\nYou don't know what you'll miss\nuntil you're missing it someday.\n\n[KID]\nSounds important.\n\n[ZIGGIE]\nBit ordinary.\n\n[Instrumental]\n\n[KID]\nSame time tomorrow?\n\n[ZIGGIE]\nNine sharp.\n\n[Soft CLINK.]`,
  },
  {
    no: 12,
    title: "My End",
    coverId: "1-JZsU-XcuOc2WdfcWWuKdAT0AJVjafiR",
    audioId: "1CWQyCo6Csbb7-yHOhjn6u1do3rdlWBB3",
    note: "The entire mythology contracts to one manageable patch of ground.",
    lyrics: `[Soft CLINK.]\n\n[KID]\nCan I ask you something?\n\n[ZIGGIE]\nYou've been doing that all day.\n\n[KID]\nWho runs the country?\n\n[ZIGGIE]\nCouldn't tell you.\n\n[KID]\nThe State?\n\n[ZIGGIE]\nChanges Tuesdays.\n\n[KID]\nHistory?\n\n[ZIGGIE]\nNobody.\n\nEverybody.\n\nDepends who writes it down.\n\n[Verse 1]\nCan't hold tomorrow,\ncan't mend yesterday.\nCan't make another heart\nthink the proper way.\n\nCan't stop the weather,\ncan't bargain with time.\nCan't carry your end, kid—\n\nI can carry mine.\n\n[Refrain]\nMy end of the table.\nMy end of the street.\nMy word when I give it.\nThe ground at my feet.\n\nMy hand on the handle.\nMy choice when I choose.\n\nNot much to control—\n\nbut enough left to lose.\n\n[KID]\nSo all those strings...\n\n[ZIGGIE]\nMostly tangled.\n\n[KID]\nAnd the government?\n\n[ZIGGIE]\nMostly tangled.\n\n[KID]\nAnd people?\n\n[ZIGGIE]\nTerribly tangled.\n\n[KID]\nWhat aren't you tangled in?\n\n[ZIGGIE]\nLunch, usually.\n\n[Small laugh]\n\n[Verse 2]\nYou can spend your whole life\nlooking high, looking wide,\n\nfor somebody steering\nfrom somewhere outside.\n\nA master.\nA monster.\nA reason.\nA plan.\n\nThen morning arrives...\n\nand you do what you can.\n\n[Build]\nOne step.\n\nOne word.\n\nOne promise you meant.\n\nOne hand you held.\n\nOne penny you spent.\n\nOne little corner\nof all you can't mend—\n\n[KID]\nSo what do you control?\n\n[Everything stops.]\n\nA passer-by approaches.\n\nCLINK.\n\n[ZIGGIE]\nMy end.\n\n[KID]\nIs that enough?\n\n[ZIGGIE]\nAsk me tomorrow.\n\n[KID]\nNine sharp?\n\n[ZIGGIE]\nNine sharp.\n\n[Three-note motif, finally resolving.]`,
  },
  {
    no: 13,
    title: "The Old Vic State Endures",
    coverId: "165AVSnlJUquiTnkruUeWqpJmjICBzEba",
    audioId: "1Sf8XL_fVOFEwQaDaTKo34CXaY9SE-Ldx",
    note: "Everything returns, except certainty. Frankston simply opens again.",
    lyrics: `[Three resolved penny notes.]\n\n[Morning street ambience]\n\n[KID]\nMorning, Frankston.\n\n[One piano]\nShutters rise.\nKettles sing.\nSomeone's lost the bloody string.\n\nYesterday nearly ended the State—\n\n[ZIGGIE]\nStill opened nine sharp.\n\n[Brass enters]\n\n[ENSEMBLE]\nSIGN IT!\nSTAMP IT!\nTEMPT YOUR FATE!\n\nLose the paperwork—\nwe'll generate it late!\n\nPaint it!\nBreak it!\nRenovate!\n\nSomehow we're still standing\nin the OLD VIC STATE!\n\n[Verse]\nDifferent faces, same old street,\ndifferent shoes on different feet.\n\nNames come down.\nNew names appear.\n\nSomeone says,\n“Remember when...?”\n\nNobody quite remembers when.\n\n[Wrong Form Clerks]\nForm Eleven!\n\n[CITIZEN]\nWRONG FORM!\n\n[Clerks]\n...fair.\n\n[Nine Sharp Choir]\nCarry the seal!\nCarry the flame!\n\n[ZIGGIE]\nPut those away.\n\n[Puppet Master Choir]\nWHO HOLDS THE STRING?!\n\n[ZIGGIE]\nApparently nobody.\n\n[ALL]\nGOOD!\n\n[BUILD]\nOne voice.\n\nTwo voices.\n\nFour.\n\nEight.\n\nThe whole street.\n\n[ALL]\nNothing stays,\nbut something remains.\n\nNot in the buildings,\nnot in the names.\n\nA joke somebody told you.\nA face at a gate.\nA shop on a corner.\nA habit running late.\n\nThe hand that you offered.\nThe promise you meant.\n\nThe ordinary Tuesday\nyou never thought you'd miss\nuntil it went.\n\n[Music softens]\n\n[KID]\nIs this the important bit?\n\n[ZIGGIE]\nProbably.\n\n[KID]\nWhat happens now?\n\n[ZIGGIE]\nTomorrow.\n\n[FULL ORCHESTRA ERUPTS]\n\n[ALL]\nSIGN IT!\nSTAMP IT!\nPASS THE PLATE!\n\nEVERYBODY'S NOBODY\nAND NOBODY'S TOO LATE!\n\nLOVE IT!\nLEAVE IT!\nCOME HOME LATE!\n\nWE'RE STILL BLOODY STANDING\nIN THE OLD VIC STATE!\n\n[Counterpoint — every song collides]\n\nCLERKS:\nWRONG FORM! RIGHT DESK!\n\nCHOIR:\nTHERE IS ANOTHER PROCEDURE!\n\nMINISTERS:\nWHO CONTROLS THE CONTROLLER?!\n\nSTREET:\nGOOD MORNING, FRANKSTON!\n\nPUPPET CHOIR:\nWHO HOLDS THE STRING?!\n\nZIGGIE:\nMind your own end!\n\n[ALL — enormous]\nTHE OLD VIC STATE—\n\n[Music cuts.]\n\nVOICE FROM SHOP\nZIGGIE!\n\n[ZIGGIE]\nRighto!\n\nFootsteps.\n\n[CONDUCTOR]\n...are we finished?\n\n[CLERK]\nNeed Form Seventeen-B.\n\n[CITIZEN]\nWrong form.\n\n[CLERK]\nOh, fuck off.\n\n[One enormous final chord.]\n\nTen seconds of ordinary street noise.\n\nA child approaches.\n\nCLINK.\n\n[CHILD]\nMorning, ZIGGIE.\n\n[ZIGGIE]\nMorning.\n\n[Tiny reprise]\nGood morning, Frankston...\nmorning again...\n\n[Unresolved final chord.]\n\nTHE OLD VIC STATE ENDURES.\n\nFor reasons presently under review.`,
  },
];

function driveThumb(id: string) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
}

function driveAudio(id: string) {
  return `https://drive.google.com/uc?export=download&id=${id}`;
}

function driveOpen(id: string) {
  return `https://drive.google.com/file/d/${id}/view`;
}

export function RecordRoom() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const active = useMemo(() => tracks[current] ?? tracks[0], [current]);

  const toggleFlip = (no: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(no)) next.delete(no);
      else next.add(no);
      return next;
    });
  };

  const playTrack = async (index: number) => {
    setCurrent(index);
    const audio = audioRef.current;
    if (!audio) return;

    const nextSrc = driveAudio(tracks[index].audioId);
    if (audio.src !== nextSrc) {
      audio.src = nextSrc;
      audio.load();
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
      window.open(driveOpen(tracks[index].audioId), "_blank", "noopener,noreferrer");
    }
  };

  const togglePlayer = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src) {
      await playTrack(current);
      return;
    }
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        window.open(driveOpen(active.audioId), "_blank", "noopener,noreferrer");
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <main className={styles.page}>
      <audio
        ref={audioRef}
        preload="none"
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onEnded={() => {
          setPlaying(false);
          if (current < tracks.length - 1) playTrack(current + 1);
        }}
      />

      <header className={styles.hero}>
        <div className={styles.eyebrow}>B$S · hidden side · working record room</div>
        <h1>ZIGGIE</h1>
        <p className={styles.subtitle}>The Gentleman Behind the Curtain</p>
        <p className={styles.intro}>
          Thirteen songs. Thirteen sleeves. Press a record to turn it over. The front is the myth; the back is the lyric sheet.
        </p>
        <div className={styles.pennyLine} aria-hidden="true">
          <span>CLINK</span><i /> <span>CLINK</span><i /> <span>CLINK</span>
        </div>
      </header>

      <section className={styles.grid} aria-label="ZIGGIE track sleeves">
        {tracks.map((track, index) => {
          const isFlipped = flipped.has(track.no);
          const isActive = current === index;
          return (
            <article className={styles.slot} key={track.no}>
              <button
                type="button"
                className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
                onClick={() => toggleFlip(track.no)}
                aria-label={`${track.title}: ${isFlipped ? "show cover" : "show lyrics"}`}
              >
                <span className={styles.cardInner}>
                  <span className={styles.front}>
                    <Image
                      src={driveThumb(track.coverId)}
                      alt={`${track.title} artwork`}
                      fill
                      sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw"
                      unoptimized
                    />
                    <span className={styles.frontShade} />
                    <span className={styles.trackStamp}>NO. {String(track.no).padStart(2, "0")} / 13</span>
                    <span className={styles.turnCue}>TURN THE RECORD ↻</span>
                  </span>
                  <span className={styles.back}>
                    <span className={styles.sheetHead}>
                      <small>THE OLD VIC STATE · LYRIC SHEET</small>
                      <b>{String(track.no).padStart(2, "0")}</b>
                    </span>
                    <span className={styles.lyricTitle}>{track.title}</span>
                    <span className={styles.rule} />
                    <span className={styles.lyrics}>{track.lyrics}</span>
                    <span className={styles.sheetFoot}>FOR REASONS PRESENTLY UNDER REVIEW · CLINK</span>
                  </span>
                </span>
              </button>

              <div className={styles.caption}>
                <div>
                  <span className={styles.no}>{String(track.no).padStart(2, "0")}</span>
                  <strong>{track.title}</strong>
                </div>
                <button
                  type="button"
                  className={`${styles.playButton} ${isActive && playing ? styles.live : ""}`}
                  onClick={() => (isActive ? togglePlayer() : playTrack(index))}
                >
                  {isActive && playing ? "PAUSE" : "PLAY"}
                </button>
              </div>
              <p className={styles.note}>{track.note}</p>
            </article>
          );
        })}
      </section>

      <aside className={styles.marginalia}>
        <span>studio marginalia</span>
        <p>
          The sequence expands from one ordinary Frankston morning into bureaucracy, ritual, conspiracy and spectacle, then folds all the way back to one street, one tray and one penny. The artwork is kept as working evidence of that build rather than polished into uniformity.
        </p>
      </aside>

      <footer className={styles.footer}>
        <Link href="/archive">← working archive</Link>
        <p>A musical of tremendous importance about almost nothing.</p>
        <Link href="/">public exhibition →</Link>
      </footer>

      <div className={styles.player}>
        <button type="button" onClick={() => setCurrent((v) => Math.max(0, v - 1))} aria-label="Previous track">←</button>
        <button type="button" className={styles.mainPlay} onClick={togglePlayer}>
          {playing ? "Ⅱ" : "▶"}
        </button>
        <div className={styles.now}>
          <small>NOW TURNING · {String(active.no).padStart(2, "0")}/13</small>
          <strong>{active.title}</strong>
        </div>
        <a href={driveOpen(active.audioId)} target="_blank" rel="noreferrer" className={styles.openAudio}>OPEN</a>
        <button type="button" onClick={() => setCurrent((v) => Math.min(tracks.length - 1, v + 1))} aria-label="Next track">→</button>
      </div>
    </main>
  );
}
