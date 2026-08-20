export type CategoryId =
  | 'loyalty'
  | 'class'
  | 'broship'
  | 'wingman'
  | 'conduct'
  | 'milestones';

export type Article = {
  id: number;
  title: string;
  category: CategoryId;
  body: string[];
  tags?: string[];
};

export type Category = {
  id: CategoryId;
  name: string;
  blurb: string;
};

export type GuidedPath = {
  id: string;
  name: string;
  blurb: string;
  articleIds: number[];
};

export const APP_NAME = 'The Bro Code';
export const APP_SUBTITLE = 'A Gentleman’s Guide to Mateship';
export const APP_TAGLINE = '70 Articles of Loyalty, Class and Broship.';

export const intro = {
  title: 'What the Bro Code Is',
  body: [
    'The Bro Code is the unwritten agreement between mates, set down here in plain words so no young man has to learn it the hard way. It is not a rulebook for winning arguments; it is a code of conduct for being someone your mates can count on.',
    'A bro is any man you would answer the phone for at three in the morning — no questions asked. The Code exists to protect that bond: to keep loyalty honest, humour kind, and character intact when it would be easier to let all three slide.',
    'These seventy articles cover loyalty, class, broship, the art of the wingman, everyday conduct, and the milestones that test a man. Read them not as commandments carved in stone, but as the hard-won wisdom of every bro who came before you.',
    'Follow the Code and you become more than a good time on a Friday night. You become dependable, generous, and quietly excellent — a worthy man of mateship, the kind of bro other bros aspire to be.',
    'Turn the page. Article 1 awaits.',
  ],
};

export const categories: Category[] = [
  { id: 'loyalty', name: 'Loyalty', blurb: 'Standing by your mates when it counts.' },
  { id: 'class', name: 'Class', blurb: 'Carrying yourself with quiet dignity.' },
  { id: 'broship', name: 'Broship', blurb: 'The bonds that hold the crew together.' },
  { id: 'wingman', name: 'The Wingman', blurb: 'Backing a bro in the field.' },
  { id: 'conduct', name: 'Conduct', blurb: 'How a bro behaves out in the world.' },
  { id: 'milestones', name: 'Milestones', blurb: 'Showing up for the big moments.' },
];

export const articles: Article[] = [
  {
    id: 1,
    title: 'A bro is always there for a bro.',
    category: 'loyalty',
    body: [
      'The first article is the foundation of every one that follows. When a mate calls in need, a bro shows up — with a jack for the flat tyre, a couch for the rough night, or simply an ear that listens without judgement.',
      'Being there is rarely convenient. That is precisely why it matters. Reliability is not measured on the easy days; it is measured on the day your bro needs you and you have somewhere else you would rather be.',
    ],
    tags: ['foundations'],
  },
  {
    id: 2,
    title: 'A bro keeps a secret.',
    category: 'loyalty',
    body: [
      'What a bro tells you in confidence stays with you. A secret shared is a trust extended, and a trust broken is rarely rebuilt.',
      'If you cannot be trusted with the small things whispered over a quiet beer, you will never be trusted with the big things that truly matter.',
    ],
  },
  {
    id: 3,
    title: 'A bro never leaves another bro behind.',
    category: 'loyalty',
    body: [
      'Whether it is the last one standing at the end of the night or the mate struggling to keep up on the hike, no bro gets abandoned. You arrived together; you leave together.',
    ],
  },
  {
    id: 4,
    title: 'A bro does not let a bro face trouble alone.',
    category: 'loyalty',
    body: [
      'Shared trouble is halved; shared silence is doubled. When a mate is in a tight spot, a bro steps into it beside him rather than commentating from a safe distance.',
    ],
  },
  {
    id: 5,
    title: 'A bro tells a bro the truth, kindly.',
    category: 'loyalty',
    body: [
      'A yes-man is not a friend. When a bro is about to make a fool of himself, a real bro says so — quietly, privately, and without cruelty.',
      'The measure of the truth you tell is not how clever it makes you sound, but whether it leaves your mate better off for having heard it.',
    ],
  },
  {
    id: 6,
    title: 'A bro defends a bro in his absence.',
    category: 'loyalty',
    body: [
      'When a mate’s name comes up and he is not in the room to speak for himself, a bro speaks for him. You do not join the pile-on; you break it up.',
    ],
  },
  {
    id: 7,
    title: 'A bro forgives a bro.',
    category: 'loyalty',
    body: [
      'Mates get it wrong. They say the careless thing, forget the important date, let you down on a bad week. A bro who apologises honestly deserves an honest reckoning and a clean slate.',
      'Grudges are heavy luggage. Set them down when the apology is real.',
    ],
  },
  {
    id: 8,
    title: 'A bro repays a debt.',
    category: 'loyalty',
    body: [
      'Money borrowed from a mate is a debt of honour before it is a debt of dollars. Pay it back promptly, in full, and preferably before you are reminded.',
    ],
  },
  {
    id: 9,
    title: 'A bro does not keep score.',
    category: 'loyalty',
    body: [
      'Friendship is not a ledger. Sometimes you give more; sometimes you take more. A bro who tallies every favour has mistaken mateship for accounting.',
    ],
  },
  {
    id: 10,
    title: 'A bro shows up on time.',
    category: 'loyalty',
    body: [
      'Being late tells your mates their time matters less than yours. Being on time, quietly and consistently, is one of the simplest respects a bro can pay.',
    ],
  },
  {
    id: 11,
    title: 'A bro dresses for the occasion.',
    category: 'class',
    body: [
      'A bro knows the difference between a backyard barbecue and a black-tie wedding, and dresses to honour the host either way. Effort is a compliment paid without words.',
    ],
  },
  {
    id: 12,
    title: 'A bro grooms himself.',
    category: 'class',
    body: [
      'Clean shoes, trimmed nails, a fresh shirt. Looking after yourself is not vanity; it is a signal that you respect both yourself and the company you keep.',
    ],
  },
  {
    id: 13,
    title: 'A bro carries himself with humility.',
    category: 'class',
    body: [
      'Confidence fills a room; arrogance empties it. A bro lets his actions do the boasting and leaves the rest unsaid.',
    ],
  },
  {
    id: 14,
    title: 'A bro is a gracious winner.',
    category: 'class',
    body: [
      'When a bro wins, he wins without gloating. He shakes the hand of the man he beat and means it, because today’s opponent is tomorrow’s teammate.',
    ],
  },
  {
    id: 15,
    title: 'A bro is a good loser.',
    category: 'class',
    body: [
      'Losing well is harder than winning well. A bro takes the loss on the chin, offers congratulations freely, and saves the analysis for the drive home.',
    ],
  },
  {
    id: 16,
    title: 'A bro tips well.',
    category: 'class',
    body: [
      'How a man treats those who serve him tells you everything. A bro tips fairly, thanks sincerely, and never takes out a bad day on someone just doing their job.',
    ],
  },
  {
    id: 17,
    title: 'A bro holds his drink.',
    category: 'class',
    body: [
      'Knowing your limit and stopping before it is a mark of self-command. A bro is fun at the party, not the cautionary tale told about it the next morning.',
    ],
  },
  {
    id: 18,
    title: 'A bro keeps his word.',
    category: 'class',
    body: [
      'A promise made is a promise kept. If a bro says he will be there, he is there; if he says he will handle it, it is handled. His word is worth more than any contract.',
    ],
  },
  {
    id: 19,
    title: 'A bro owns his mistakes.',
    category: 'class',
    body: [
      'When a bro is wrong, he says so plainly and fixes what he can. Excuses are for men who intend to make the same mistake again.',
    ],
  },
  {
    id: 20,
    title: 'A bro speaks well of others.',
    category: 'class',
    body: [
      'Gossip is cheap and it always finds its way back. A bro builds people up in conversation, and the reputation he earns for it is worth more than any secret he could have traded.',
    ],
  },
  {
    id: 21,
    title: 'A bro respects the crew.',
    category: 'broship',
    body: [
      'The crew is bigger than any one bro. Decisions that affect everyone are made together, and no single mate hijacks the plans of the many for the whims of the one.',
    ],
  },
  {
    id: 22,
    title: 'A bro brings his mate into the circle.',
    category: 'broship',
    body: [
      'When a bro arrives with a new friend, the crew makes room. Everyone was the new guy once, and a warm welcome is the cheapest kindness a bro can offer.',
    ],
  },
  {
    id: 23,
    title: 'A bro does not ghost the group.',
    category: 'broship',
    body: [
      'Life gets busy and that is understood. But a bro answers the message, RSVPs to the plan, and does not vanish for months only to reappear needing a favour.',
    ],
  },
  {
    id: 24,
    title: 'A bro celebrates a bro’s win.',
    category: 'broship',
    body: [
      'When a mate lands the job, the deal, or the date, a bro is genuinely glad — no envy, no backhanded compliments. A win for one bro is a win for the crew.',
    ],
  },
  {
    id: 25,
    title: 'A bro checks in on the quiet one.',
    category: 'broship',
    body: [
      'The mate who has gone silent is often the one who needs a bro most. A simple “you good?” has pulled more men back from the edge than any grand gesture.',
      'Mateship is not only for the good times. Sometimes the most important thing a bro does is notice.',
    ],
  },
  {
    id: 26,
    title: 'A bro keeps the group chat sacred.',
    category: 'broship',
    body: [
      'What is said in the crew stays in the crew. Screenshots are betrayals, and the bro who leaks the chat learns quickly how small his world becomes.',
    ],
  },
  {
    id: 27,
    title: 'A bro shares the load.',
    category: 'broship',
    body: [
      'Whoever drives, whoever books, whoever carries the esky — the effort of keeping a crew together is split fairly. A bro does not let the same mate organise everything forever.',
    ],
  },
  {
    id: 28,
    title: 'A bro remembers the details.',
    category: 'broship',
    body: [
      'The team you support, the drink you order, the name of your dog. A bro who remembers the small things proves he was actually listening — and that is rarer than it should be.',
    ],
  },
  {
    id: 29,
    title: 'A bro settles disputes face to face.',
    category: 'broship',
    body: [
      'A grievance with a mate is aired in person, calmly, not litigated over text at midnight. Hard conversations held well are what separate a crew that lasts from one that fractures.',
    ],
  },
  {
    id: 30,
    title: 'A bro keeps old mates and makes new ones.',
    category: 'broship',
    body: [
      'New friendships are a joy; old ones are an anchor. A bro tends both, and never lets a shiny new circle crowd out the mates who knew him before he was anyone.',
    ],
  },
  {
    id: 31,
    title: 'A bro is a wingman first.',
    category: 'wingman',
    body: [
      'In the field, a bro’s job is to make his mate look good, not to steal the spotlight. The wingman clears the runway; he does not fly the plane.',
    ],
  },
  {
    id: 32,
    title: 'A bro takes one for the team.',
    category: 'wingman',
    body: [
      'Every wingman knows the drill: sometimes you hold the less thrilling conversation so your mate gets his shot. A bro does it graciously and never lets on that it was a sacrifice.',
    ],
  },
  {
    id: 33,
    title: 'A bro never undermines his mate’s chances.',
    category: 'wingman',
    body: [
      'A wingman builds his bro up, not down. You do not tell the embarrassing story, reveal the awkward nickname, or compete for the same attention. You add lift, never drag.',
    ],
  },
  {
    id: 34,
    title: 'A bro reads the signal to leave.',
    category: 'wingman',
    body: [
      'A good wingman knows when the job is done and bows out with grace. Lingering is not loyalty; it is a lack of awareness.',
    ],
  },
  {
    id: 35,
    title: 'A bro has his mate’s back, not his blind spots.',
    category: 'wingman',
    body: [
      'Backing a bro does not mean enabling him. If a mate is about to do something he will regret, a true wingman is the one who quietly steers him clear.',
    ],
  },
  {
    id: 36,
    title: 'A bro does not pursue a mate’s ex without a blessing.',
    category: 'wingman',
    body: [
      'Some lines are worth respecting. Where a mate’s past relationship is concerned, a bro talks to him first, honestly, before feelings and friendships get tangled.',
    ],
  },
  {
    id: 37,
    title: 'A bro is honest about the setup.',
    category: 'wingman',
    body: [
      'When a bro plays matchmaker, he tells the truth about both parties. A friendship built on a wingman’s exaggeration collapses the moment reality arrives.',
    ],
  },
  {
    id: 38,
    title: 'A bro celebrates his mate’s relationship.',
    category: 'wingman',
    body: [
      'When the wingman’s work pays off and a mate finds someone real, a bro is happy for him — even if it means fewer nights out. Growth is not betrayal.',
    ],
  },
  {
    id: 39,
    title: 'A bro protects his mate’s dignity.',
    category: 'wingman',
    body: [
      'Rejection stings. A bro makes sure his mate walks away with his head high, turning a bruised ego into a good story rather than a bad night.',
    ],
  },
  {
    id: 40,
    title: 'A bro knows the wingman debt is repaid.',
    category: 'wingman',
    body: [
      'The favour of a good wingman is always returned. Tonight you clear the way for him; another night, he does the same for you. That is the quiet economy of mateship.',
    ],
  },
  {
    id: 41,
    title: 'A bro respects the house he visits.',
    category: 'conduct',
    body: [
      'Shoes off if that is the custom, feet off the coffee table, and a thank-you to whoever hosted. A bro leaves a home a little tidier than he found it.',
    ],
  },
  {
    id: 42,
    title: 'A bro brings something to the party.',
    category: 'conduct',
    body: [
      'Never arrive empty-handed. A six-pack, a bag of ice, a plate of something — a bro contributes to the gathering he is lucky enough to be invited to.',
    ],
  },
  {
    id: 43,
    title: 'A bro cleans up after himself.',
    category: 'conduct',
    body: [
      'The mess you make is yours to clear. A bro does not leave the campsite, the kitchen, or the group project for someone else to sort out.',
    ],
  },
  {
    id: 44,
    title: 'A bro drives responsibly.',
    category: 'conduct',
    body: [
      'Behind the wheel a bro carries the safety of everyone in the car and everyone on the road. He never drives impaired, and he hands over the keys the moment he should.',
    ],
  },
  {
    id: 45,
    title: 'A bro respects the queue.',
    category: 'conduct',
    body: [
      'Waiting your turn is a small daily test of character. A bro does not push in, and he does not save spots for a dozen mates who wander up later.',
    ],
  },
  {
    id: 46,
    title: 'A bro keeps his phone in his pocket.',
    category: 'conduct',
    body: [
      'At dinner, at the game, in a real conversation, a bro gives his attention to the people in front of him. The screen can wait; the moment cannot.',
    ],
  },
  {
    id: 47,
    title: 'A bro pays his round.',
    category: 'conduct',
    body: [
      'The shout is sacred. A bro tracks whose turn it is and steps up when it is his, without a sudden need for the bathroom when the bill approaches.',
    ],
  },
  {
    id: 48,
    title: 'A bro respects the referee.',
    category: 'conduct',
    body: [
      'Whether it is a Sunday-league umpire or the mate keeping score, a bro accepts the call and plays on. Sportsmanship off the field is just called being decent.',
    ],
  },
  {
    id: 49,
    title: 'A bro helps a stranger.',
    category: 'conduct',
    body: [
      'Mateship does not stop at the edge of the crew. A bro helps the person who has dropped their shopping, missed their stop, or simply looks lost — no audience required.',
    ],
  },
  {
    id: 50,
    title: 'A bro keeps his cool.',
    category: 'conduct',
    body: [
      'Anger is easy and rarely useful. A bro who can stay calm under provocation holds a quiet power that shouting will never match.',
    ],
  },
  {
    id: 51,
    title: 'A bro respects his elders.',
    category: 'conduct',
    body: [
      'A bro listens to those who walked the road first. Experience is a gift freely given, and only a fool interrupts a good story to prove he already knows the ending.',
    ],
  },
  {
    id: 52,
    title: 'A bro keeps a promise to a child.',
    category: 'conduct',
    body: [
      'To a kid, a promise is everything. A bro who says he will come to the game, teach the trick, or read the story, follows through — because that is where trust in the world begins.',
    ],
  },
  {
    id: 53,
    title: 'A bro respects an honest day’s work.',
    category: 'conduct',
    body: [
      'No job is beneath a bro’s respect. He values the tradie, the nurse, the cleaner and the clerk, and he never mistakes a job title for the measure of a man.',
    ],
  },
  {
    id: 54,
    title: 'A bro looks after his health.',
    category: 'conduct',
    body: [
      'A bro cannot be there for his mates if he does not look after himself. Sleep, movement, a check-up when something is off — self-care is a duty, not an indulgence.',
    ],
  },
  {
    id: 55,
    title: 'A bro talks about the hard stuff.',
    category: 'conduct',
    body: [
      'Bottling it up is not toughness. A bro speaks up when he is struggling and makes it safe for his mates to do the same. The strongest thing a man can say is “I’m not okay.”',
      'Silence has cost too many good bros. Break it early and break it often.',
    ],
  },
  {
    id: 56,
    title: 'A bro celebrates a birthday.',
    category: 'milestones',
    body: [
      'A message, a call, a beer — a bro marks the day his mate came into the world. It costs nothing and it says everything: I am glad you are here.',
    ],
  },
  {
    id: 57,
    title: 'A bro shows up to the wedding.',
    category: 'milestones',
    body: [
      'When a mate marries, a bro is there in his best shirt with a genuine toast ready. You witness the vow, you honour the day, and you do not upstage the couple.',
    ],
  },
  {
    id: 58,
    title: 'A bro stands up when asked.',
    category: 'milestones',
    body: [
      'Being asked to stand beside a mate on his big day is an honour, not a chore. A bro says yes, gives the speech his best, and keeps the roast affectionate.',
    ],
  },
  {
    id: 59,
    title: 'A bro welcomes the new baby.',
    category: 'milestones',
    body: [
      'When a mate becomes a father, a bro brings a meal, offers a hand, and understands that late nights out will be traded for early mornings in. The crew adapts.',
    ],
  },
  {
    id: 60,
    title: 'A bro shows up to the funeral.',
    category: 'milestones',
    body: [
      'When a mate grieves, a bro is there — in a suit, in silence, in whatever way helps. You do not need the perfect words. You just need to be present.',
    ],
  },
  {
    id: 61,
    title: 'A bro helps a mate move house.',
    category: 'milestones',
    body: [
      'The great trial of friendship: a ute, a flight of stairs, and a fridge. A bro shows up, lifts his share, and never lets a mate face moving day alone.',
    ],
  },
  {
    id: 62,
    title: 'A bro supports a mate’s new venture.',
    category: 'milestones',
    body: [
      'When a mate starts the business, the band, or the podcast, a bro is a first customer and a loud supporter. Encouragement early is worth more than praise once it is safe to give.',
    ],
  },
  {
    id: 63,
    title: 'A bro visits a mate in hospital.',
    category: 'milestones',
    body: [
      'Illness is lonely. A bro turns up with a bad magazine and worse jokes, because company is medicine that no pharmacy stocks.',
    ],
  },
  {
    id: 64,
    title: 'A bro helps a mate get back on his feet.',
    category: 'milestones',
    body: [
      'After a job lost, a relationship ended, or a plan collapsed, a bro offers the couch, the contact, and the confidence to start again. Everyone falls; mates help you rise.',
    ],
  },
  {
    id: 65,
    title: 'A bro honours a mate’s parents.',
    category: 'milestones',
    body: [
      'The people who raised your mate get your respect and your manners, always. A bro remembers their names, helps with the dishes, and never forgets whose house it is.',
    ],
  },
  {
    id: 66,
    title: 'A bro keeps a tradition alive.',
    category: 'milestones',
    body: [
      'The annual trip, the birthday ritual, the standing Friday catch-up — traditions are the scaffolding of a lasting friendship. A bro protects them from the slow erosion of “too busy.”',
    ],
  },
  {
    id: 67,
    title: 'A bro mentors a younger bro.',
    category: 'milestones',
    body: [
      'The Code is passed down, not hoarded. A bro takes the time to teach a younger man the ropes, because the wisdom he was given was never meant to end with him.',
    ],
  },
  {
    id: 68,
    title: 'A bro apologises when he has grown.',
    category: 'milestones',
    body: [
      'Becoming a better man sometimes means making peace with an old wrong. A bro who has grown has the courage to say sorry for who he used to be.',
    ],
  },
  {
    id: 69,
    title: 'A bro passes the Code on.',
    category: 'milestones',
    body: [
      'This code survives only if it is shared. A bro lives it plainly enough that others want to learn it, and generous enough that he is glad to teach.',
    ],
  },
  {
    id: 70,
    title: 'A bro remembers: the Code is about becoming a better man.',
    category: 'milestones',
    body: [
      'Every article points to the same destination. The Bro Code is not really about your mates at all — it is about the kind of man you decide to be for them.',
      'Loyalty, class and broship are not rules to obey but habits to grow into. Live them long enough and one day a younger bro will look to you the way you once looked to someone else. That is the whole point.',
    ],
    tags: ['foundations'],
  },
];

export const guidedPaths: GuidedPath[] = [
  {
    id: 'foundations',
    name: 'The Foundations',
    blurb: 'Start here. The core articles every young bro should know first.',
    articleIds: [1, 2, 3, 5, 18, 70],
  },
  {
    id: 'wingman',
    name: 'The Wingman’s Way',
    blurb: 'How to back a mate in the field with class.',
    articleIds: [31, 32, 33, 34, 35, 39, 40],
  },
  {
    id: 'character',
    name: 'Class & Character',
    blurb: 'Carry yourself like the man your mates believe you to be.',
    articleIds: [11, 13, 15, 17, 19, 20, 50],
  },
  {
    id: 'loyalty',
    name: 'Loyalty Under Fire',
    blurb: 'What it means to stand by a bro when it is hard.',
    articleIds: [1, 4, 6, 7, 25, 55],
  },
  {
    id: 'showing-up',
    name: 'Showing Up',
    blurb: 'Being present for the milestones that define a friendship.',
    articleIds: [56, 57, 60, 61, 63, 64, 67],
  },
];

export const articleById = new Map(articles.map((a) => [a.id, a] as const));
export const categoryById = new Map(categories.map((c) => [c.id, c] as const));

export function broOfTheDayId(date = new Date()): number {
  const start = Date.UTC(2024, 0, 1);
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const dayIndex = Math.floor((today - start) / 86_400_000);
  return articles[((dayIndex % articles.length) + articles.length) % articles.length].id;
}
