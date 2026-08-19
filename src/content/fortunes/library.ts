import type {
  Fortune,
  FortuneCategory,
  FortuneMood,
  FortunePairing,
} from "./types";

/**
 * The handwritten fortune library.
 *
 * House style, in order of importance:
 * - Short. The answer is the punch; the kicker is the shrug afterwards.
 * - Dry before clever. Cheeky before cruel. Never cruel.
 * - Australian, suburban, spoken. No corporate register, no AI cadence.
 * - Occasionally, without warning, entirely sincere.
 *
 * A line is either `open` (its kicker can be paired with another answer in the
 * same drawer) or `fixed` (the two halves only work together). Mark anything
 * self-referential as `fixed` or the machine will produce nonsense.
 *
 * The architecture is sized for 300+ lines. Add to a drawer; nothing else
 * needs to change.
 */
type Line =
  | [id: string, mood: FortuneMood, answer: string, kicker: string]
  | [
      id: string,
      mood: FortuneMood,
      answer: string,
      kicker: string,
      pairing: FortunePairing,
    ];

const drawer = (category: FortuneCategory, lines: Line[]): Fortune[] =>
  lines.map(([id, mood, answer, kicker, pairing]) => ({
    id,
    category,
    mood,
    answer,
    kicker,
    pairing: pairing ?? "open",
  }));

const money = drawer("money", [
  ["money-01", "dry", "Possible.", "Check the ticket before you resign."],
  ["money-02", "dry", "Keep the receipt.", "Luck has terrible filing habits."],
  ["money-03", "blunt", "Not today.", "Today is for avoiding a worse decision."],
  ["money-04", "cheeky", "Someone will.", "Statistically it is rarely the person asking."],
  ["money-05", "dry", "Spend it slower.", "Money leaves the way it arrived, only faster."],
  ["money-06", "blunt", "Two dollars.", "That is the honest forecast. The rest is hope.", "fixed"],
  ["money-07", "dry", "Pay the small one first.", "Small debts get loud."],
  ["money-08", "cheeky", "Ask again in April.", "Money has a financial year. You do not."],
  ["money-09", "dry", "You can afford it.", "Whether you should is a different counter."],
  ["money-10", "blunt", "Not from here.", "This is a shop, not a bank.", "fixed"],
  ["money-11", "dry", "Round it down.", "Anyone who rounds up is lying to themselves."],
  ["money-12", "cryptic", "Cash.", "Cash remembers nothing. That is the point.", "fixed"],
  ["money-13", "sincere", "It will arrive late.", "Most good money does."],
  ["money-14", "dry", "Buy the cheap one.", "Then buy the good one when the cheap one dies.", "fixed"],
  ["money-15", "blunt", "No.", "And you knew that before the coins went in."],
]);

const luck = drawer("luck", [
  ["luck-01", "dry", "Your odds improve when you look.", "They improve again when you read the fine print."],
  ["luck-02", "sincere", "A small yes is coming.", "Do not frighten it with a five-year plan."],
  ["luck-03", "cryptic", "Not all luck jingles.", "Some of it remembers your name."],
  ["luck-04", "cheeky", "Ten times.", "Lightning has an address in Frankston, and this is it.", "fixed"],
  ["luck-05", "cheeky", "Rub the monkey.", "It has worked before. It has also failed considerably more often.", "fixed"],
  ["luck-06", "dry", "Wrong day.", "Tuesday people get all the luck and none of the manners."],
  ["luck-07", "sincere", "Yes, briefly.", "Enjoy it before you start analysing it."],
  ["luck-08", "sincere", "You already used some.", "You got here, didn't you."],
  ["luck-09", "dry", "Check your pockets.", "Luck is often just a forgotten twenty."],
  ["luck-10", "dry", "Buy the ticket.", "The dream costs less than the coffee."],
  ["luck-11", "cheeky", "Someone in this queue.", "Statistically. Eventually. Not necessarily you."],
  ["luck-12", "dry", "Luck is a habit.", "So is standing in the wrong queue."],
  ["luck-13", "blunt", "The numbers are fine.", "It is the expectation that needs work.", "fixed"],
  ["luck-14", "cryptic", "Ask the counter.", "This counter has seen ten of these.", "fixed"],
]);

const love = drawer("love", [
  ["love-01", "sincere", "Say the honest bit.", "The clever bit can wait outside."],
  ["love-02", "dry", "Yes, probably.", "Buy flowers only if you know which ones."],
  ["love-03", "cheeky", "Give it a week.", "A monkey should not be your rebound.", "fixed"],
  ["love-04", "blunt", "Ring them.", "Texting is for people with more time than they think."],
  ["love-05", "blunt", "No.", "You knew before you asked. That is why you asked a monkey.", "fixed"],
  ["love-06", "sincere", "They noticed.", "People always notice. They just say nothing for years."],
  ["love-07", "sincere", "Turn up.", "Half of love is attendance."],
  ["love-08", "blunt", "Apologise properly.", "Without the word 'but' anywhere in it.", "fixed"],
  ["love-09", "cheeky", "Not that one.", "The other one."],
  ["love-10", "dry", "Keep it boring.", "Boring is what thirty years looks like from the outside."],
  ["love-11", "dry", "Yes.", "And do not make a speech about it."],
  ["love-12", "cheeky", "Ask them what they want.", "Radical, I know."],
  ["love-13", "dry", "Wait.", "Not forever. Just past Friday."],
  ["love-14", "sincere", "It will hold.", "Most things do, if someone opens up each morning."],
]);

const work = drawer("work", [
  ["work-01", "cheeky", "Absolutely.", "Just not before payday."],
  ["work-02", "dry", "Take the meeting.", "You can complain about it accurately afterwards."],
  ["work-03", "sincere", "The door still needs opening.", "Do the next useful thing."],
  ["work-04", "dry", "Stay six months.", "Then leave loudly enough to be remembered."],
  ["work-05", "blunt", "No.", "Not on a Monday, anyway."],
  ["work-06", "blunt", "Ask for more.", "The worst answer is the one you already have."],
  ["work-07", "dry", "They will cope.", "Badly. But they will cope."],
  ["work-08", "dry", "Do the boring half first.", "The interesting half will still be there."],
  ["work-09", "blunt", "Not your problem.", "You have been carrying it since March."],
  ["work-10", "dry", "Say yes.", "Then write down exactly what you agreed to."],
  ["work-11", "cryptic", "Learn the till.", "Every job has a till. Learn it.", "fixed"],
  ["work-12", "blunt", "Quit properly.", "Two weeks, a clean handover, no speech."],
  ["work-13", "dry", "Turn up early once.", "Watch who else does."],
  ["work-14", "sincere", "It is a job.", "It is not a personality.", "fixed"],
]);

const family = drawer("family", [
  ["family-01", "blunt", "Ring your mother.", "That was not advice. That was an instruction.", "fixed"],
  ["family-02", "dry", "Let it go.", "Christmas is four months of memory and one day of proof."],
  ["family-03", "sincere", "Yes, help them.", "Quietly. Not in a group chat."],
  ["family-04", "dry", "Same as always.", "Families are not a problem to be solved."],
  ["family-05", "sincere", "Take the photo.", "Nobody has ever regretted the photo."],
  ["family-06", "cheeky", "Not at the table.", "Say it in the car park like a normal person."],
  ["family-07", "sincere", "They are proud.", "They are also incapable of saying so."],
  ["family-08", "sincere", "Go to the thing.", "You will not remember the excuse."],
  ["family-09", "cryptic", "Ask them about 1996.", "You will get a better story than you expect."],
  ["family-10", "blunt", "Yes, it is your turn.", "It has been your turn for a while."],
  ["family-11", "sincere", "Write it down.", "Stories leave the house with the people who hold them."],
  ["family-12", "cheeky", "Feed them.", "Ninety per cent of family is catering."],
]);

const frankston = drawer("frankston", [
  ["frankston-01", "dry", "You can try.", "Frankston has your forwarding address."],
  ["frankston-02", "cryptic", "Meet me on Thompson Street.", "Look for the monkey.", "fixed"],
  ["frankston-03", "cryptic", "The bay knows.", "It is refusing to comment."],
  ["frankston-04", "cheeky", "Everyone comes back.", "Some of them for the parking."],
  ["frankston-05", "sincere", "It has changed.", "So have you. Neither of you mention it."],
  ["frankston-06", "sincere", "Ask someone who stayed.", "They have the better version."],
  ["frankston-07", "dry", "Not before the train.", "Nothing in Frankston starts before the train."],
  ["frankston-08", "dry", "Yes, in summer.", "Ask again in July and get a different answer."],
  ["frankston-09", "dry", "Down past the roundabout.", "If you hit water you have gone too far.", "fixed"],
  ["frankston-10", "blunt", "It was worse in 2003.", "That is not nostalgia. That is a fact."],
  ["frankston-11", "sincere", "The shop is still there.", "That is the whole answer.", "fixed"],
  ["frankston-12", "blunt", "Say Frankston properly.", "No apology in the middle of it.", "fixed"],
  ["frankston-13", "sincere", "Thirty years.", "Long enough to stop explaining yourself."],
  ["frankston-14", "blunt", "It is not the end of the line.", "It is a place people live.", "fixed"],
]);

const regret = drawer("regret", [
  ["regret-01", "dry", "It was years ago.", "You are the only one still holding the receipt."],
  ["regret-02", "cheeky", "Yes, that was a mistake.", "Congratulations on the accurate self-assessment."],
  ["regret-03", "sincere", "You cannot un-say it.", "You can say something better next."],
  ["regret-04", "sincere", "Let it be old.", "Not everything has to stay current."],
  ["regret-05", "blunt", "Apologise once.", "Twice is for you, not for them."],
  ["regret-06", "sincere", "You did what you could.", "With what you had. At the time."],
  ["regret-07", "dry", "It mattered less than you think.", "Disappointing and freeing in equal parts."],
  ["regret-08", "cryptic", "Different question.", "Ask me what you do on Thursday instead.", "fixed"],
  ["regret-09", "dry", "Nobody remembers.", "Except you, at 2am, in high definition."],
  ["regret-10", "blunt", "Fix the next one.", "The last one is not on the shelf any more."],
  ["regret-11", "sincere", "Keep it.", "A little regret keeps you honest."],
  ["regret-12", "blunt", "Throw it out.", "Some things are not artefacts. Some things are rubbish."],
]);

const future = drawer("future", [
  ["future-01", "dry", "Later than you want.", "Sooner than you are ready for."],
  ["future-02", "cryptic", "About the same.", "With one surprise you would not believe if I told you."],
  ["future-03", "cheeky", "Ask again in five years.", "I will still be here. Probably."],
  ["future-04", "sincere", "Yes, but slowly.", "Everything good arrives on foot."],
  ["future-05", "sincere", "You will be fine.", "Fine is an underrated outcome."],
  ["future-06", "cryptic", "Two more winters.", "Then it eases."],
  ["future-07", "dry", "Not the way you planned.", "Better in one part, worse in another. Roughly even."],
  ["future-08", "sincere", "A door opens.", "Someone still has to unlock it. That someone is you."],
  ["future-09", "dry", "Keep the receipt.", "Futures get returned more often than you would think."],
  ["future-10", "cryptic", "It depends on Thursday.", "Most futures do."],
  ["future-11", "sincere", "You will look back on this.", "Fondly, and inaccurately."],
  ["future-12", "cheeky", "Yes.", "Write down that I said so. I will deny everything.", "fixed"],
]);

const silly = drawer("silly", [
  ["silly-01", "blunt", "That is not a question.", "That is a mood with a question mark.", "fixed"],
  ["silly-02", "blunt", "No.", "Next."],
  ["silly-03", "cheeky", "I am a monkey in a tobacconist.", "You have made your choice of advisor.", "fixed"],
  ["silly-04", "blunt", "Ask a doctor.", "Ask any doctor. Ask a bad one. Not me.", "fixed"],
  ["silly-05", "cheeky", "Yes, obviously.", "You wanted permission, not information."],
  ["silly-06", "dry", "Try the internet.", "Then come back when it lies to you."],
  ["silly-07", "cheeky", "Wrong shop.", "We sell newspapers, not answers. Mostly.", "fixed"],
  ["silly-08", "blunt", "Bold.", "That is all I have."],
  ["silly-09", "dry", "Say that out loud again.", "You will hear it."],
  ["silly-10", "dry", "Sure.", "It is your afternoon."],
  ["silly-11", "blunt", "Put it down.", "Whatever it is. Put it down.", "fixed"],
  ["silly-12", "cheeky", "Not for a dollar.", "Some answers cost more than this machine takes.", "fixed"],
]);

const mystery = drawer("mystery", [
  ["mystery-01", "cryptic", "The blue one.", "You will know which blue when you see it.", "fixed"],
  ["mystery-02", "cheeky", "Ask again after lunch.", "Wisdom has low blood sugar."],
  ["mystery-03", "cryptic", "Three.", "The answer is three. The question was optional.", "fixed"],
  ["mystery-04", "cryptic", "Somebody left a key.", "It is not for your door.", "fixed"],
  ["mystery-05", "cryptic", "The bell rang and nobody came in.", "That happens about once a month. Make of it what you like.", "fixed"],
  ["mystery-06", "cryptic", "Yes, but not in that order.", "Order is a retail invention."],
  ["mystery-07", "cryptic", "Look behind the newspapers.", "There is always something behind the newspapers.", "fixed"],
  ["mystery-08", "cryptic", "The answer arrived in 2004.", "It has been sitting on the shelf ever since.", "fixed"],
  ["mystery-09", "cryptic", "Not while the lights are on.", "Come back at closing."],
  ["mystery-10", "cryptic", "Two of those are the same thing.", "You will work out which two.", "fixed"],
  ["mystery-11", "dry", "The monkey has no comment.", "The monkey has never had a comment.", "fixed"],
  ["mystery-12", "cryptic", "It rhymes with what you already suspect.", "That is as close as I get.", "fixed"],
  ["mystery-13", "dry", "You already know.", "You came here hoping a monkey would take the blame.", "fixed"],
  ["mystery-14", "blunt", "Proceed carefully.", "Confidence is not a receipt."],
]);

const encouragement = drawer("encouragement", [
  ["encouragement-01", "sincere", "Go on then.", "Nobody is going to stop you."],
  ["encouragement-02", "sincere", "You are doing better than the report suggests.", "Reports get written by people who were not there.", "fixed"],
  ["encouragement-03", "sincere", "Keep opening the door.", "That is the whole trick. There is no other trick.", "fixed"],
  ["encouragement-04", "sincere", "You are allowed.", "Nobody posts out a permission slip."],
  ["encouragement-05", "sincere", "It gets easier.", "Not soon. But it does."],
  ["encouragement-06", "sincere", "You have done harder.", "Check the record. You have.", "fixed"],
  ["encouragement-07", "sincere", "Good.", "Genuinely. Well done."],
  ["encouragement-08", "sincere", "Take the win.", "Small wins are still wins. Ask anyone in here."],
  ["encouragement-09", "blunt", "Rest first.", "Then decide. Never the other way round."],
  ["encouragement-10", "sincere", "Someone is glad you exist.", "They will never say so at the right moment."],
  ["encouragement-11", "sincere", "Come in tomorrow.", "Tell me how it went.", "fixed"],
  ["encouragement-12", "blunt", "Stop asking and start.", "The machine agrees with you already."],
]);

export const fortunes: Fortune[] = [
  ...money,
  ...luck,
  ...love,
  ...work,
  ...family,
  ...frankston,
  ...regret,
  ...future,
  ...silly,
  ...mystery,
  ...encouragement,
];
