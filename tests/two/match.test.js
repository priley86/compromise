import test from 'tape'
import nlp from './_lib.js'
const here = '[two/match] '

let arr = [
  ['toronto', '#City'],
  ['mexico', '#Country'],
  ['Jamaica', '#Country'],
  ['legendary', '#Adjective'],
  ['above', '#Adjective'],
  ['moderate', '#Adjective'],
  ['extreme', '#Adjective'],
  ['august', '#Month'],
  ['saturday', '#WeekDay'],
  ['really', '#Adverb'],
  ['each', '#Determiner'],
  ['voila', '#Expression'],
  ['new england', '#Place'],
  ['hers', '#Possessive'],
  ['onto', '#Preposition'],
  ['blvd', '#Place'],
  ['belgian', '#Demonym'],
  ['cactus', '#Singular'],
  ['cacti', '#Plural'],
  ['economy', '#Noun'],
  ['engineer', '#Noun'],
  ['clothing', '#Noun'],
  ['duran duran', '#Organization+'],
  ['american express', '#Organization+'],
  ['brotherhood', '#Noun'],
  ['oakland athletics', '#SportsTeam'],
  ['jamie', '#Person'],
  ['claire', '#FemaleName'],
  ['arthur', '#MaleName'],
  ['¥', '#Currency'],
  ['pence', '#Currency'],
  ['seven', '#Value'],
  ['seventeen', '#Value'],
  ['twenty', '#Value'],
  ['thousand', '#Value'],
  ['eighteenth', '#Value'],
  ['tbsp', '#Unit'],
  ['wrote', '#PastTense'],
  ['write', '#Verb'],
  ['survive', '#Verb'],
  ['attempt', '#Verb'],
  ["mc'adams", '#LastName'],
  ['Müller', '#LastName'],
  ['muller', '#LastName'],
  ['425-1231', '#PhoneNumber'],
  ['823-425-1231', '#PhoneNumber'],
  ['823 425-1231', '#PhoneNumber'],
  ['(823) 425-1231', '#PhoneNumber'],
  ['+1-123-444-5655', '#PhoneNumber'],
  ['invest', '#Verb'],
  ['investing', '#Verb'],
  [`wallys'`, '#Possessive'],
  ['zero in', '#Verb #Particle'],
  ['glacier', '#Singular'],
  ['glaciers', '#Plural'],
  ['withers', '#PresentTense'],
  ['wither', '#Infinitive'],
  ['german', '#Demonym'],
  ['germans', '#Demonym'],
  ['germans', '#Plural'],
  ['write off', '#Infinitive #PhrasalVerb'],
  ['writes off', '#PhrasalVerb #Particle'],
  ['wrote off', '#PastTense #Particle'],
  ['tided over', '#PastTense #Particle'],
  ['cres', '#Abbreviation'],
  ['nucleus', '#Singular'],
  ['nuclei', '#Plural'],
  ['sting', '#Infinitive'],
  ['stung', '#PastTense'],

  // [`JDI University'`, 'Organization'],
  ['ocean', '#Noun'],
  ['shiver', '#Verb'],
  [`flanders'`, '#Possessive'],
  [`chillin'`, '#Gerund'],
  [`'cool'`, '#Adjective'],
  ['MMMCMXXIII', '#RomanNumeral'],
  // ['MIMMCMXXIII', '#Acronym'], //invalid roman numeral
  ['c.e.o', '#Acronym'],
  ['MDMA', '#Acronym'],
  ['unless', '#Condition'],
  //
  ['great', '#Adjective'],
  ['walked', '#PastTense'],
  ['singing', '#Gerund'],
  ['funniest', '#Superlative'],
  ['sillier', '#Comparative'],
  ['the', '#Determiner'],
  ['iraqi', '#Demonym'],
  ['december', '#Date'],
  ['fifth', '#Value'],
  ['suddenly', '#Adverb'],
  ['shanghai', '#City'],
  ['google', '#Organization'],
  ['wash', '#Infinitive'],
  ['rewash', '#Infinitive'],
  ['re-wash', '#Infinitive'],
  ['re-washed', '#PastTense'],
  ['rewashed', '#PastTense'],
  ['rewashes', '#PresentTense'],
  ['rewashing', '#Gerund'],
  ['repurchase', '#Infinitive'],
  ['re-purchase', '#Infinitive'],
  ['unpurchase', '#Infinitive'],
  ['purchased', '#PastTense'],
  ['unpurchasing', '#Gerund'],
  ['unpurchases', '#PresentTense'],
  ['resolve', '#Infinitive'],
  ['restructure', '#Infinitive'],
  ['reconcile', '#Infinitive'],
  ['repeat', '#Infinitive'],
  // // more

  ['John is pretty', '#Person #Copula #Adjective'],
  ['John was lofty', '#Person #Copula #Adjective'],
  ['John Smith was lofty', '#FirstName #LastName #Copula #Adjective'],
  ['asdfes was lofty', '#Noun #Copula #Adjective'],
  ['asdfes lksejfj was lofty', '#Noun #Noun #Copula #Adjective'],
  ['Spencer Kelly is in Canada', '#Person #Person #Copula #Preposition #Place'],
  ['He is in Canada', '#Pronoun #Copula #Preposition #Place'],
  ['5 red roses', '#Value #Adjective #Noun'],
  // ['3 trains', '#Value #Noun'],
  ['3 trainers', '#Value #Noun'],
  ['5 buses', '#Value #Noun'],
  ['101010101010101010101010101010101010101010', '#NumericValue'],

  ['walk the walk', '#Verb #Determiner #Noun'],
  ['Peter the man', '#Person #Determiner #Noun'],
  // ['book the flight', '#Verb #Determiner #Noun'],

  ['one dream', '#Value #Singular'],
  ['two dreams', '#Value #Plural'],

  // modal verbs
  ['can buy', '#Modal #Verb'],
  ['he can', '#Pronoun #Verb'],
  ['the can', '#Determiner #Noun'],

  ['will earn', '#Modal #Verb'],
  ['they will', '#Pronoun #Verb'],
  ['the will', '#Determiner #Noun'],

  ['may leave', '#Modal #Verb'],
  ['they may', '#Pronoun #Verb'],
  ['this may', '#Determiner #Noun'],

  //slang, contractions
  ['u r nice', '#Pronoun #Copula #Adjective'],
  ['canadian bacon', '#Demonym #Noun'],
  ['canadian dollar', '#Currency #Currency'],

  //possessive rules
  ["john lkjsdf's", '#Person #Possessive'],
  ["john lkjsdf's house", '#Person #Possessive #Noun'],
  ["john Lkjsdf's house", '#Person #Possessive #Noun'],
  ["john Lkjsdf's House", '#Person #Possessive #Noun'],
  ["mark's question mark", '#Possessive #Noun #Noun'],

  //question-words
  ['who is good?', '#QuestionWord #Copula #Adjective'],
  ['which is good?', '#QuestionWord #Copula #Adjective'],
  // ['bacon which is good', '#Noun #Pronoun #Copula #Adjective'],
  // ['bacon which really is good', '#Noun #Pronoun #Adverb #Copula #Adjective'],
  // ['Douglas who really is good', '#Person #Pronoun #Adverb #Copula #Adjective'],

  //web text things
  ['lkj@fun.com', '#Email'],
  ['j@f.ti', '#Email'],
  ['j@ti', '#Noun'],
  ['@ti', '#AtMention'],
  ['#funtimes', '#HashTag'],
  ['http://fun.com/cool?fun=yes', '#Url'],
  ['#cool fun.com @cooman', '#HashTag #Url #AtMention'],

  //determiner-corrections
  ['this rocks dude', '#Determiner #Verb #Noun'],
  ['that rocks dude', '#Determiner #Verb #Noun'],
  ['the rocks dude', '#Determiner #Plural #Noun'],
  ['these rocks dude', '#Determiner #Plural #Noun'],
  ['those rocks dude', '#Determiner #Plural #Noun'],
  ['the test string', '#Determiner #Noun #Noun'],

  //people
  ['John swim', '#Person #Verb'],
  ['John, John', '#Person #Person'],
  ['John, you', '#FirstName #Pronoun'],
  ['John you', '#MaleName #Pronoun'],
  ['you John you', '#Pronoun #Person #Pronoun'],
  // ['10 + 9', '#Value #Symbol #Value'],
  // ['2 * 90 = 180', '#Value #Symbol #Value #Symbol #Value'],
  // ['one - seventy-six', '#Value #Symbol #Value'],
  ['The stream runs', '#Determiner #Noun #Verb'],
  ['The stream really runs', '#Determiner #Noun #Adverb #Verb'],
  ['The nice stream really runs', '#Determiner #Adjective #Noun #Adverb #Verb'],

  ['he is walking', '#Pronoun #Copula #Gerund'],
  ['walking is fun', '#Activity #Copula #Adjective'],
  ["walking's great", '#Activity #Copula #Adjective'],
  ['jack cheered', '#Person #PastTense'],
  ['jack guarded', '#Person #PastTense'],
  ['jack is guarded', '#Person #Copula #Adjective'],
  ['jack seems guarded', '#Person #Verb #Adjective'],
  //more
  ['there are reasons', '#Noun #Copula #Plural'],
  ['there were many walks', '#Noun #Copula #Adjective #Plural'],
  ['there were the walks', '#Noun #Copula #Determiner #Noun'],

  // ['it was fixed', '#Noun #Copula #PastTense'],
  ['it will be boxed', '#Noun #Verb #Verb #PastTense'],
  //ambiguous adverbs
  ['it was pretty', '#Noun #Copula #Adjective'],
  ['it was pretty cool', '#Noun #Copula #Adverb #Adjective'],
  // ['it was really pretty cool', '#Noun #Copula #Adverb #Adverb #Adjective'],
  ['it was just', '#Noun #Copula #Adjective'],
  ['it was just gorgeous', '#Noun #Copula #Adverb #Adjective'],

  ['butterfly', '#Singular'],
  ['he blamed the girl', '#Pronoun #PastTense #Determiner #Singular'],
  ['his fine', '#Possessive #Noun'],

  //acronyms
  // ['contracted AIDS', '#PastTense #Acronym'],
  ['contacted nbc', '#PastTense #Acronym'],
  ['UNESCO', '#Acronym'],
  ['NAFTA', '#Acronym'],

  ['city/town', '#Noun'],
  ['city/town', 'city'],
  ['city/town', 'town'],
  ['boyfriend to Jane', '#Noun #Conjunction #Person'],
  // ['boyfriend of Jane', '#Noun #Conjunction #Person'],
  ['his fines', '#Possessive #Noun'],
  ['100+ rumours', '#Value #Plural'],
  ['John & John,', '#Noun #Noun #Noun'],
  // ['i am gutted', '#Noun #PastTense #Adjective'],
  ['N.V.,', '#Noun'],

  // verb suffixes
  ['lied', '#PastTense'],
  ['lies', '#PresentTense'],
  ['owed', '#PastTense'],
  ['owes', '#PresentTense'],
  ['aced', '#PastTense'],
  ['vied', '#PastTense'],
  ['vies', '#PresentTense'],
  ['husked', '#PastTense'],
  ['husks', '#PresentTense'],
  ['masked', '#PastTense'],
  ['planned', '#PastTense'],
  ['hummed', '#PastTense'],

  // numberrange
  ['it was 1-2 kg woooh', '#Noun #PastTense #NumberRange #NumberRange #NumberRange #Unit #Expression'],
  ['1-1', '#NumberRange #NumberRange #NumberRange'],
  ['12-12', '#NumberRange #NumberRange #NumberRange'],
  ['123-123', '#NumberRange #NumberRange #NumberRange'],
  ['1234-1234', '#Noun'],

  ['bakes', '#PresentTense'],
  ['fakes', '#PresentTense'],
  ['makes', '#PresentTense'],
  ['mistakes', '#PresentTense'],
  ['overtakes', '#PresentTense'],
  ['remakes', '#PresentTense'],
  ['retakes', '#PresentTense'],
  ['forsakes', '#PresentTense'],
  ['shakes', '#PresentTense'],
  ['snakes', '#PresentTense'],
  ['takes', '#PresentTense'],
  ['undertakes', '#PresentTense'],

  ['baked', '#PastTense'],
  ['faked', '#PastTense'],
  ['maked', '#PastTense'],
  ['mistaked', '#PastTense'],
  ['overtook', '#PastTense'],
  ['remaked', '#PastTense'],
  ['retaked', '#PastTense'],
  ['forsaked', '#PastTense'],
  ['shaked', '#PastTense'],
  ['snaked', '#PastTense'],
  ['took', '#PastTense'],
  ['undertook', '#PastTense'],

  //phrasal verb tense
  ['head-over', '#PresentTense #Particle'],
  ['head-under', '#PresentTense #Particle'],
  ['haze-over', '#PresentTense #Particle'],
  ['hazed-over', '#PastTense #Particle'],
  ['headed-over', '#PastTense #Particle'],
  ['heading-under', '#Gerund #Particle'],
  ['healing-over', '#Gerund #Particle'],

  //abbreviations
  [
    'col. Patrick said march and feb. etc.',
    '#Abbreviation #Person #PastTense #Month #Conjunction #Abbreviation #Abbreviation',
  ],
  [`i met April O'neil`, '#Pronoun #PastTense #Person #Person'],

  // adjectives
  ['germans are nice', '#Demonym #Verb #Adjective'],
  ['Iraqis are nice', '#Plural #Copula #Adjective'],
  ['canadians are nice', '#ProperNoun #Verb #Adjective'],
  ['thom is smart', '#ProperNoun #Verb #Adjective'],

  [`ANAB, ENA, CCP etc.`, '#Acronym #Acronym #Acronym #Abbreviation'],
  [`as disgusting as`, '#Preposition #Adjective #Preposition'],
  [`more disgusting than`, '#Adverb #Adjective #Preposition'],
  [`was so nausiating`, '#Copula #Adverb #Adjective'],
  [`extremely moving`, '#Adverb #Adjective'],
  // [`each promising image`, '#Determiner #Adjective #Singular'],
  [`this reckoning`, '#Determiner #Noun'],
  [`it was redefining`, '#Pronoun #Copula #Adjective'],
  [`it was a redefining moment`, '#Pronoun #Copula #Determiner #Adjective #Noun'],
  [`he is redefining art`, '#Pronoun #Copula #Verb #Noun'],
  [`revealing his guts`, '#Verb #Possessive #Plural'],
  // [`the ruling party`, '#Determiner #Adjective #Singular'],
  [`i found it isolating`, '#Noun #PastTense #Noun #Adjective'],
  // [`promising to leave`, '#Gerund #Conjunction #Verb'],
  [`distressing us`, '#Gerund #Noun'],
  [`loving you`, '#Gerund #Noun'],
  [`it was disgusting`, '#Pronoun #Copula #Adjective'],
  [`dark green`, '#Adverb #Adjective'],
  [`kinda sparkly`, '#Adverb #Adjective'],
  [`quite stunning`, '#Adverb #Adjective'],
  [`slowly stunning`, '#Adverb #Verb'],
  [`quite awfully dashing`, '#Adverb #Adverb #Adjective'],
  [`quite awfully swimming`, '#Adverb #Adverb #Verb'],
  ['is doing well', '#Copula #Gerund #Adverb'],
  ['well, no.', '#Expression #Expression'],
  ['he is well', '#Pronoun #Copula #Adjective'],
  ['is well made', '#Copula #Adverb #Adjective'],
  ['at some point', '#Preposition #Determiner #Noun'],
  ['to a point', '#Conjunction #Determiner #Noun'],

  // infinitive-noun
  [`a tv show`, '#Determiner #Noun #Noun'],
  [`send me a currency report.`, '#Infinitive #Pronoun #Determiner #Noun #Noun'],
  // [`a close watch on`, '#Determiner #Adjective #Noun #Preposition'],
  [`a surgery date of`, '#Determiner #Noun #Noun #Preposition'],
  [`A girl hit a boy.`, '#Determiner #Noun #Infinitive #Determiner #Noun'],
  [`a auto repair shop.`, '#Determiner #Noun #Noun #Noun'],
  // timezones
  ['Morocco Standard Time', '#Timezone #Timezone #Timezone'],
  ['GMT+9', '#Timezone'],
  ['3pm EST', '#Time #Timezone'],
  ['3pm eastern time', '#Time #Timezone #Timezone'],
  ['pacific standard time', '#Timezone #Timezone #Timezone'],
  ['korea daylight time', '#Timezone #Timezone #Timezone'],
  // urls
  ['https://www.f3schools.com', '#Url'],
  ['https://f3scho0ls.com', '#Url'],
  ['https://www.fu4bar.f3scho0ls.com', '#Url'],
  ['http://compromise.cool', '#Url'],
  ['http://a.jp', '#Url'],
  // hyphens
  ['cartoon-ish', '#Adjective'],
  ['over-joyous', '#Adjective'],
  ['walk-able', '#Adjective'],
  ['trans-national', '#Adjective'],
  ['re-create', '#Verb'],
  ['micro-computer', '#Noun'],

  // contractions
  // 't
  ["we ain't", 'we are not'],
  ["she ain't", 'she is not'],
  ["she really ain't", 'she really is not'],
  ["we really ain't", 'we really are not'],
  ["the hotels really ain't", 'the hotels really are not'],
  ["the boxer really ain't", 'the boxer really is not'],
  // 's
  [`spencer's buritto`, `spencer's buritto`],
  [`spencer's walked`, `spencer has walked`],
  [`spencer's nice`, `spencer is nice`],
  // 'd
  [`i'd really walked`, `i had really walked`],
  [`i'd really see`, `i would really see`],
  [`how'd she do`, `how did she do`],

  // famous people names
  ['john stewart', '#MaleName #LastName'],
  ['martha stewart', '#FemaleName #LastName'],
  ['George Bush', '#MaleName #LastName'],
  ['Hillary Clinton', '#FemaleName #LastName'],
  // ['Hillary Rodham Clinton', '#FemaleName #Person #LastName'],
  ['Hillary Rodham Clinton', '#FemaleName #Person #Person'],
  ['Margaret Thatcher', '#FemaleName #LastName'],
  ['Messiaen', '#Person'],
  ['Mozart', '#LastName'],
  ['Nixon', '#LastName'],
  ['Pope John Paul II', '#Honorific #Person+'],
  ['Richard Nixon', '#MaleName #LastName'],
  ['Ronald Reagan', '#MaleName #LastName'],
  ['Saddam Hussain', '#Person+'],
  ['Shostakovich', '#LastName'],
  ['Vivaldi', '#LastName'],
  ['van Gogh', '#Person+'],
  ['Carl Marx', '#MaleName #LastName'],
  ['Lenin', '#LastName'],
  ['Stalin', '#LastName'],
  ['George W. Bush', '#MaleName #Person #LastName'],
  ['Mitt Romney', '#Person+'],
  ['Barack Obama', '#Person+'],
  ['Obama', '#LastName'],
  ['Lady Gaga', '#Person+'],
  ['Kanye West', '#Person+'],
  ['Abu Hamza', '#MaleName #Person'],
  ['Abu Hamza Al - Masri', '#MaleName #Person+'],
  ['Osama bin Laden', '#Person+'],
  ['Mubarek', '#Person'],
  ['Muhammad Ali', '#MaleName #LastName'],
  ['Jennifer Aniston', '#FemaleName #LastName'],
  ['Tyra Banks', '#Person+'],
  ['Mario Batali', '#MaleName #LastName'],
  ['David Beckham', '#MaleName #LastName'],
  ['Halle Berry', '#Person+'],
  ['Tom Brady', '#MaleName #LastName'],
  ['Matthew Broderick', '#MaleName #LastName'],
  ['Nathan Lane', '#MaleName #LastName'],
  ['Mel Brooks', '#Person+'],
  ['Dan Brown', '#MaleName #LastName'],
  ['Jerry Bruckheimer', '#MaleName #LastName'],
  ['Kobe Bryant', '#Person+'],
  ['Gisele Bundchen', '#FemaleName #LastName'],
  ['Jim Carrey', '#MaleName #LastName'],
  ['Dave Chappelle', '#MaleName #LastName'],
  ['Sean Combs', '#MaleName #LastName'],
  ['Katie Couric', '#FemaleName #LastName'],
  ['Simon Cowell', '#MaleName #LastName'],
  ['Tom Cruise', '#MaleName #LastName'],
  ['Johnny Depp', '#MaleName #LastName'],
  ['Cameron Diaz', '#FirstName #LastName'],
  ['Leonardo DiCaprio', '#MaleName #LastName'],
  ['Celine Dion', '#FemaleName #LastName'],
  ['Jodie Foster', '#FemaleName #LastName'],
  ['John Grisham', '#MaleName #LastName'],
  ['Tom Hanks', '#MaleName #LastName'],
  ['Paris Hilton', '#Person+'],
  ['Eric Idle', '#MaleName #LastName'],
  ['Mike Nichols', '#MaleName #LastName'],

  ['16.125', '#Cardinal'],
  ['+160.125', '#Cardinal'],
  ['-0.1', '#Cardinal'],
  ['.13', '#Cardinal'],
  ['(127.54)', '#Cardinal'],

  ['16.125th', '#Ordinal'],
  ['161,253th', '#Ordinal'],
  ['+160.125th', '#Ordinal'],
  ['-0.2nd', '#Ordinal'],
  ['(127.54th)', '#Ordinal'],
  // ['(127.54)', '#Money'],

  ['-0.1%', '#Percent'],
  ['.1%', '#Percent'],
  ['+2,340.91%', '#Percent'],
  ['-2340%', '#Percent'],

  ['$-2340.01', '#Money'],
  ['-$2340', '#Money'],
  ['+$2340.01', '#Money'],
  ['$2340.01', '#Money'],
  ['£1,000,000', '#Money'],
  ['$19', '#Money'],
  ['($127.54)', '#Money'],
  ['2,000₽', '#Money'],
  ['2000₱', '#Money'],
  ['2000௹', '#Money'],
  ['₼2000', '#Money'],
  ['2.23₽', '#Money'],
  ['₺50', '#Money'],

  ['$47.5m', '#Money'],
  ['$47.5bn', '#Money'],
  // ['1,000,000p', '#Cardinal'],

  ['google', '#Organization'],
  ['google inc', '#Organization+'],
  ['Capital One', '#Organization+'],
  ['HSBC', '#Organization'],
  ['NASA', '#Organization'],
  ['al qaeda', '#Organization+'],
  ['FBI', '#Organization'],
  ['monsanto', '#Organization'],
  ['Johnson & Johnson', '#Organization+'],
  ['Johnson & Johnson LLC', '#Organization+'],

  //-ced
  ['they lanced', '. #PastTense'],
  ['he balanced', '. #PastTense'],
  ['we seduced', '. #PastTense'],

  //-shed
  ['impoverished', '#PastTense'],
  ['stashed', '#PastTense'],
  ['crashed', '#PastTense'],
  //-sed
  ['amused', '#PastTense'],
  ['bruised', '#PastTense'],
  ['crossed', '#PastTense'],
  ['dressed', '#PastTense'],
  ['exposed', '#PastTense'],
  ['tossed', '#PastTense'],
  ['tensed', '#PastTense'],
  ['hosed', '#PastTense'],

  //-led
  ['consoled', '#PastTense'],
  ['fuelled', '#PastTense'],
  ['nailed', '#PastTense'],
  ['nestled', '#PastTense'],
  ['riddled', '#PastTense'],
  ['sailed', '#PastTense'],
  ['totaled', '#PastTense'],
  ['whirled', '#PastTense'],

  //-ked
  ['linked', '#PastTense'],
  ['freaked', '#PastTense'],
  ['tucked', '#PastTense'],
  ['cocked', '#PastTense'],

  ['pounced', '#PastTense'],
  ['punched', '#PastTense'],
  ['rumbled', '#PastTense'],
  ['wetted', '#PastTense'],
  ['dubbed', '#PastTense'],
  ['trascribed', '#PastTense'],
  ['barred', '#PastTense'],
  ['vetoed', '#PastTense'],
  ['drenched', '#PastTense'],
  ['fetched', '#PastTense'],
  ['sighed', '#PastTense'],
  ['encouraged', '#PastTense'],
  ['messaged', '#PastTense'],
  ['tugged', '#PastTense'],
  ['wedged', '#PastTense'],
  ['beeped', '#PastTense'],
  ['topped', '#PastTense'],
  ['wiped', '#PastTense'],
  ['logged', '#PastTense'],
  ['displayed', '#PastTense'],
  ['skyped', '#PastTense'],
  ['swallowed', '#PastTense'],
  ['viewed', '#PastTense'],
  ['mooned', '#PastTense'],
  ['boozed', '#PastTense'],
  ['stowed', '#PastTense'],
  ['issued', '#PastTense'],
  ['accrued', '#PastTense'],
  ['defended', '#PastTense'],
  ['engulfed', '#PastTense'],
  ['fed', '#PastTense'],
  ['strafed', '#PastTense'],
  ['stifled', '#PastTense'],
  ['winged', '#PastTense'],
  ['amazed', '#PastTense'],
  ['boxed', '#PastTense'],
  ['shoved', '#PastTense'],
  ['attained', '#PastTense'],
  ['warmed', '#PastTense'],
  ['dried', '#PastTense'],
  ['rallied', '#PastTense'],

  [`http://cool.com/fun`, '#Url'],
  [`https://cool.com`, '#Url'],
  [`https://cool.com/`, '#Url'],
  [`https://www.cool.com/`, '#Url'],
  [`http://subdomain.cool.com/`, '#Url'],
  [`www.fun.com/`, '#Url'],
  [`www.fun.com`, '#Url'],
  [`www.fun.com/foobar/fun`, '#Url'],
  [`www.subdomain.cool.com/`, '#Url'],
  [`wwwsubdomain.cool.com/`, '#Url'],
  [`woo.br`, '#Url'],
  [`woohoo.biz`, '#Url'],
  [`woop.org/news`, '#Url'],
  [`http://woop.org/news?foo=bar`, '#Url'],
  [`http:subdomain.cool.com/`, '#Url'],
  [`http://subdomain.cool.com/`, '#Url'],
  [`https://en.m.wikipedia.org`, '#Url'],
  [`https://en.m.wikipedia.org/wiki`, '#Url'],
  [`en.m.wikipedia.org/wiki?`, '#Url'],

  [`s@s.com`, '#Email'],
  [`sasdf@sasdf.com`, '#Email'],
  [`sasdf@sasdf.ti`, '#Email'],
  [`_@_.com`, '#Email'],

  [`#lkjsdf`, '#HashTag'],
  [`#ll`, '#HashTag'],
  [`#22ll`, '#HashTag'],
  [`#_22ll`, '#HashTag'],

  ['five hundred feet', '#Value+ #Unit'],
  ['50 square feet', '#Value+ #Unit+'],
  ['90 hertz', '#Value #Unit'],
  ['two books', '#Value #Noun'],
  ['two hundred', '#Value #Value'],
  ['4 hundred and ten', '#Value+'],
  ['4 and a half million', '#Value+'],
  ['499 thousand', '#Value+'],
  ['499', '#Value'],
  ['4,899', '#Value'],
  ['John Smith', '#Person+'],
  ['dr. John Smith', '#Honorific #Person+'],
  ['John Smith jr.', '#Person+'],
  ['John Jacob Smith', '#FirstName #Person+'],
  ['Jani K. Smith', '#FirstName #Acronym #LastName'],
  ['asdfefs', '#Noun'],
  ['octopus', '#Noun'],
  ['tree', '#Noun'],
  ['i', '#Noun'],
  ['FBI', '#Organization'],
  ['F.B.I.', '#Organization'],
  ['Fundo ltd.', '#Organization+'],
  ['at Fun co', 'at #Organization+'],
  ['Smith & Rogers', '#Organization+'],
  ['Google', '#Organization'],
  ['tuesday', '#Date'],
  ['february', '#Date'],
  ['february fifth', '#Date+'],
  ['tuesday march 5th', '#Date+'],
  // ['tuesday march 5th, 2015', '#Date+'],

  ['truth, bravery', '@hasComma bravery'],
  ['spencer did.', 'spencer @hasPeriod'],
  ['spencer did!', 'spencer @hasExclamation'],
  ['spencer did?', 'spencer @hasQuestionMark'],
  ['spencer did...', 'spencer @hasEllipses'],
  ['no fair; i said', 'no @hasSemicolon i said'],
  ['tornado/hurricane', 'hurricane'],
  ['tornado/hurricane', 'tornado'],
  ['tornado/hurricane', '@hasSlash'],
  ['like a tornado/hurricane', 'like a @hasSlash'],
  ["he isn't going", 'he @hasContraction #Gerund'],
  ['FIFA', '@isAcronym'],
  ['spencer', '@isKnown'],

  // july 8th
  ['swore', '#PastTense'],
  ['tore', '#PastTense'],
  ['gore', '#Noun'],
  [`spencer's city/town & cabin`, 'spencer city and .'],
  ['city/town', 'town'],
  // aug 18
  ["There's holes everywhere", 'there are #Plural .'],
  ["There's an issue", 'there is #Determiner #Noun'],
  ['Let’s not forget', 'let us not #Verb'],
  ['the thing about love', '#Determiner #Noun about #Noun'],
  [`I don't get much [sleep]`, 'i do not #Infinitive much #Noun'],

  // aug 22
  ['the cardio dance party', '#Determiner #Noun #Noun #Noun'],
  ['the mexican train hijacker', '#Determiner #Noun #Noun #Noun'],
  // ['the dining experience', '#Determiner #Noun #Noun #Noun'],
  ['the student loan default rate', '#Determiner #Noun #Noun #Noun #Noun'],
  ['the examples include Jonathan Swift', '#Determiner #Noun #Verb #Noun #Noun'],
  ['the feet kick him', '#Determiner #Noun #Verb #Noun'],
  ['the fast train', 'the #Adjective #Noun'],
  ['the faster train', 'the #Adjective #Noun'],
  ['the fastest train', 'the #Adjective #Noun'],

  // // sep 14
  ['buy the dress', '#Verb the #Noun'],
  ['security forces take', '#Noun #Noun #Verb'],
  ['they sing tribute', '#Pronoun #Verb #Noun'],
  ['they sing praises', '#Pronoun #Verb #Plural'],
  // ['they cast doubt', '#Pronoun #Verb #Noun'],
  ['we help stop tragedies', '#Pronoun #Verb #Verb #Plural'],
  // ['being close', '#Verb #Adjective'],
  ['take control', '#Verb #Noun'],
  ['seek progress', '#Verb #Noun'],
  ['are building dreams', '#Copula #Gerund #Plural'],
  ['my aching head', 'my #Adjective #Noun'],
  // ['Ignoring commute costs', '#Verb #Noun #Noun'],
  ['the World Trade Center', 'the #Noun #Noun #Noun'],
  ['minimizing side reactions', '#Gerund #Noun #Noun'],
  ['would not give rise', '#Modal not #PhrasalVerb #Particle'],
  // ['it sounds like her ', 'it #Verb #Adverb her'],
  // ['side of fries ', '#Noun of #Plural'],
  ['side with traitors', '#Verb with #Plural'],
  ['bright side of life', '#Adjective #Noun of #Noun'],
  ['the way of love', 'the #Noun of #Noun'],
  ['daily side hustle', '#Adjective #Noun #Noun'],
  ['mask the pain', '#Verb the #Noun'],
  ['tony the tiger', '#Noun the #Noun'],
  // ['help unmask the great slice', '#Verb #Verb the #Adjective #Noun'],
  ['help Dubai heal', '#Verb #Noun #Verb'],
  ['the euro sense', 'the #Noun #Noun'],
  ['the lights come on', 'the #Plural #Verb #Particle'],
  ['the letters concern', 'the #Plural #Verb'],
  ['the thriving village', '#Determiner #Adjective #Noun'],
  ['the roof got wet', 'the #Noun #Verb #Adjective'],
  ['the aging process', 'the #Noun #Noun'],
  ['the new start', 'the #Adjective #Noun'],
  ['this cabinet post', '#Determiner #Noun #Noun'],
  ['our drink', '#Possessive #Noun'],
  ['our drinks', '#Possessive #Noun'],
  // ['mental age and calendar age', '#Noun #Noun and #Noun #Noun'],
  ['mandatory spending', '#Adjective #Noun'],
  ['falling into diet traps', '#Gerund into #Noun #Plural'],
  ['a flexible tape measure', 'a #Adjective #Noun #Noun'],
  ['home-field advantage', '#Noun #Noun #Noun'],
  ['while in this state', 'while in this #Noun'],
  ['I’M camping', '#Pronoun #Copula #Gerund'],
  ['dutch brewing giant', '#Noun #Noun #Noun'],
  // ['tacos were way over cooked', '#Plural #Verb #Adverb #Adjective #Adjective'],
  ['they were under appreciated', '#Pronoun #Verb #Adjective #Adjective'],
  ['they felt appreciated', '#Pronoun #PastTense #Adjective'],
  // ['some brand of cleaner', '#Noun #Noun of #Noun'],
  // ['some sort of dog', '#Noun #Noun of #Noun'],
  ['a dog of some sort', 'a #Noun of #Adjective #Noun'],
  ['the dutch feel', '#Determiner #Noun #Noun'],
  ['the captains feel too', '#Determiner #Noun #Verb #Adverb'],
  ['the euro challenge to', '#Determiner #Noun #Verb to'],
  ['the euro challenge', '#Determiner #Noun #Noun'],
  ['the baby dump', '#Determiner #Noun #Noun'],
  ['the nurse march', '#Determiner #Noun #Noun'],
  ['date of birth', '#Noun of #Noun'],
  ['kiss of death', '#Noun of #Noun'],
  ['he used to live', '#Noun #Auxiliary #Auxiliary #Infinitive'],
  ['poodles like being pampered', '#Plural #Infinitive #Gerund #PastTense'],
  ['poodles like to be pampered', '#Plural #Infinitive to #Verb #PastTense'],

  [`walk in on`, '#PhrasalVerb #Particle #Preposition'],
  [`standing out in`, '#PhrasalVerb #Particle #Preposition'],
  [`stood up in`, '#PastTense #Particle #Preposition'],
  [`stood out on`, '#PastTense #Particle #Preposition'],
  [`walked out in`, '#PastTense #Particle #Preposition'],
  [`looked back on`, '#PastTense #Particle #Preposition'],
  [`is back on`, '#Copula #Adjective #Preposition'],
  // before/after switches
  // noun-verb
  [`date the boy`, '#PresentTense #Determiner #Noun'],
  [`date of birth`, '#Noun #Preposition #Noun'],
  [`any flood`, '#Determiner #Noun'],
  [`will flood`, '. #PresentTense'],
  [`suddenly flood`, '. #PresentTense'],
  [`not flood`, '. #PresentTense'],
  [`we date`, '. #PresentTense'],
  [`you flood`, '. #PresentTense'],
  [`date spencer`, '#Verb .'],
  [`flash the`, '#Verb .'],
  [`flash his`, '#Verb .'],
  [`flash around`, '#Verb .'],
  [`flood you`, '#Verb .'],
  [`my flood`, '. #Noun'],
  [`one flood`, '. #Noun'],
  [`flash could`, '#Noun .'],
  [`flash is`, '#Noun .'],

  // adj-gerund
  [`shocking quickly`, '#Gerund .'],
  [`shocking me`, '#Gerund .'],
  [`shocking his`, '#Gerund .'],
  [`imagines shocking`, '. #Gerund'],
  [`quickly shocking`, '. #Gerund'],
  [`quietly shocking`, '. #Gerund'],
  [`shocking him`, '#Gerund .'],
  [`trusting the`, '#Gerund .'],
  [`charming every`, '#Gerund .'],
  [`revealing a clue`, '#Gerund . .'],
  [`revealing clue`, '#Adjective .'],
  [`shocking spencer's`, '#Gerund .'],
  [`commanding the field`, '#Gerund #Determiner #Noun'],
  [`shocking ignorance`, '#Adjective .'],
  [`extremely charming`, '. #Adjective'],
  [`is shocking`, '. #Adjective'],
  [`really shocking`, '. #Adjective'],
  [`too insulting`, '. #Adjective'],
  [`bruising defence`, '#Adjective .'],
  [`enduring legacy`, '#Adjective .'],
  // adj-past
  [`very detailed plan`, '. #Adjective #Noun'],
  [`our detailed plan`, '. #Adjective #Noun'],
  [`the detailed plan`, '. #Adjective #Noun'],
  [`well equipped`, '. #Adjective'],
  [`quickly detailed`, '. #PastTense'],
  [`deeply closed`, `. #Adjective`],
  [`detailed plan`, '#Adjective .'],
  [`seemed closed`, `. #Adjective`],
  [`failed class`, '#Adjective .'],
  [`intoxicated little`, '#Adjective .'],
  [`closed it`, `#PastTense .`],
  [`cramped his style`, `#PastTense #Pronoun #Noun`],
  [`he detailed`, '. #PastTense'],
  [`quickly closed`, `. #PastTense`],
  [`badly damaged`, `. #Adjective`],

  // [`wish that`, '#PresentTense .'],
  // [`that wish`, '. #Singular'],

  // ['10.-200 ug/L', '#Value to #Value #Unit'],
  // ['10-200 ug/L', '#Value to #Value #Unit'],
  // ['0.5-0.2 mg/L', '#Value to #Value #Unit'],

  // [`drinks and food fuel shopping at new Saks`, '#Noun and #Noun #Noun #Noun at new #Noun'],
  // [`litigation costs`, '#Noun #Noun'],
  // [`the dog, whose skip was Frank`, 'the #Noun whose #Noun was #Person'],
  // [`on Microsoft operating systems,`, 'on #Noun #Noun #Noun'],
  // [`uncovered wounds heal faster`, '#Adjective #Noun #Verb #Comparative'],
  // // [`a national security issue `, 'a #Noun #Noun #Noun'],
  // [`formal thought patterns `, '#Adjective #Noun #Plural'],
  // [`every parenting system`, 'every #Noun #Noun'],
  // [`with Scotland winning 49 matches `, 'with #Place #Gerund #Value #Plural'],
  // // [`become overly weakened`, '#Verb #Adverb #PastTense'],
  // [`a completely beaten man`, 'a #Adverb #Verb #Noun'],
  // [`the said card`, 'the #Adjective #Noun'],
  // [`one super strong character`, '. #Adverb #Adjective #Noun'],
  // [`we charged back`, 'we #PastTense #Adverb'],
  // [`for suspected terrorists`, 'for #Adjective #Plural'],
  // [`for discounted beauty items`, 'for #Adjective #Noun #Plural'],
  // [`number of registered party members`, '#Noun of #Adjective #Noun #Plural'],
  // [`rely on bottled water`, '#Verb on #Noun #Noun'],
  // [`will have waited until release`, '#Auxiliary #Auxiliary #PastTense until #Noun'],
  // [`selling like hot cakes`, '#Gerund like #Noun #Plural'],
  // [`have given up on reason`, '#Auxiliary #PhrasalVerb #Particle on #Noun'],
  // [`you have some valid points`, '#Noun #Verb some #Adjective #Plural'],
  // [`for some reason`, 'for some #Noun'],
  // [`dirty tricks`, '#Adjective #Plural'],
  // [`a press release`, '#Determiner #Noun #Noun'],
  // [`the same type of shouts`, '#Determiner same #Noun of #Plural'],
  // [`the same kind of shouts`, '#Determiner same #Noun of #Plural'],
  // [`they are essential to expand`, '#Noun #Verb #Adjective to expand'],
  // [`had a rocky release`, 'had #Determiner #Adjective #Noun'],
  // [`doing better for fights`, '#Gerund #Adjective for #Plural'],
  // [`might get better aim`, '#Auxiliary #Verb #Comparative #Noun'],
  // [`i think tipping blows`, 'i #PresentTense #Gerund #Adjective'],

  [`charity chapman`, `#Person #Person`],
  [`charity feels`, `#Person #Verb`],
  [`darwin said`, `#Person #Verb`],
  [`victoria learned`, `#Person #Verb`],
  [`charity said`, '#Person #Verb'],
  [`april learned`, '#Person #Verb'],
  [`bob in the water`, '#Verb in the #Noun'],

  ['dept of state', '#Noun of #Noun'],
  // [ `must-see show`,''],
  [`smelled like smoke`, '#PastTense . #Noun'],
  [`would look like`, '#Modal #Infinitive .'],
  [`zero in`, '#PhrasalVerb #PhrasalVerb'],
  [`it was time`, '#Noun #Copula #Noun'],
  [`I've said`, '#Pronoun have #PastTense'],
  [`I've read`, '#Pronoun have #PastTense'],
  [`provide record levels`, '#Infinitive . #Plural'],
  [`cut costs`, '#Verb #Plural'],
  [`I will attach`, '#Pronoun #Verb #Verb'],
  [`Leo in 2005`, '#Noun in #Year'],
  [`June 14 Reception`, '#Date #Date #Noun'],
  [`They will mature`, '#Pronoun will #Infinitive'],
  [`john k. johnson`, '#Person #Person #Person'],

  [`putting his hand`, '#Verb #Possessive #Noun'],
  [`defeating his longstanding rivals`, '#Verb #Possessive #Adjective #Plural'],
  [`understand my answer`, '#Verb #Possessive #Noun'],
  [`child’s play`, '#Possessive #Noun'],
  [`describes his brush with death`, '#Verb #Possessive #Noun with #Noun'],
  [`decide their fate`, '#Verb #Possessive #Noun'],
  [`take your time`, '#Verb #Possessive #Noun'],
  [`strengthen our trade relations`, '#Verb #Possessive #Noun #Plural'],
  [`i need your help`, 'i #Verb #Possessive #Noun'],
  [`have our unyielding support`, '#Verb #Possessive #Adjective #Noun'],
  [`my dear`, '#Possessive #Noun'],

  [`My old position`, '#Possessive #Adjective #Noun'],
  [`john's whole world`, '#Possessive #Adjective #Noun'],
  [`your online profiles`, '#Possessive #Adjective #Noun'],
  [`their past mistakes`, '#Possessive #Adjective #Noun'],
  [`Toronto's epic Instagram feed`, '#Possessive #Adjective #Noun #Noun'],
  [`in your foul shoes`, 'in #Possessive #Adjective #Noun'],
  [`MY DEAR WIFE`, '#Possessive #Adjective #Noun'],
  [`our beloved sons`, '#Possessive #Adjective #Noun'],
  // [`your majesty shall`, '#Possessive #Adjective #Verb'],
  [`my youthful mind`, '#Possessive #Adjective #Noun'],
  [`our full support`, '#Possessive #Adjective #Noun'],

  [`the feminine`, `the #Noun`],
  [`the feminine form`, `the #Adjective #Noun`],
  [`I'm fuckin' around with two geese`, `#Pronoun #Copula #Gerund #Particle #Preposition #Value #Plural`],
  [`he changes`, `#Noun #PresentTense`],
  [`his changes`, `#Noun #Plural`],
  // [``, ``],
] //match-two
test('match:', function (t) {
  arr.forEach(function (a) {
    let [str, match] = a
    let doc = nlp(str).compute('tagRank')
    let tags = doc.json()[0].terms.map(term => term.tagRank[0])
    let msg = `'${(str + "' ").padEnd(20, ' ')}  - '${tags.join(', ')}'`
    let m = doc.match(match)
    t.equal(m.text(), doc.text(), here + msg)
  })
  t.end()
})
