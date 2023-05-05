import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-toPastParticiple] '

test('toPastParticiple:', function (t) {
  let arr = [
    // [`I eat breakfast every morning.`, `I have eaten breakfast every morning.`],
    // [`She reads a book before bed.`, `She has read a book before bed.`],
    // [`He teaches math to high school students.`, `He has taught math to high school students.`],
    // [`They walk their dog in the park.`, `They have walked their dog in the park.`],
    // [`We watch a movie on Friday nights.`, `We have watched a movie on Friday nights.`],
    // [`I eat pizza.`, `I have eaten pizza.`],
    // [`He reads books.`, `He has read books.`],
    // [`They run marathons.`, `They have run marathons.`],
    // [`She sings songs.`, `She has sung songs.`],
    // [`We write letters.`, `We have written letters.`],
    // [`You speak Spanish.`, `You have spoken Spanish.`],
    // [`He swims laps.`, `He has swum laps.`],
    // [`They climb mountains.`, `They have climbed mountains.`],
    // [`She dances ballet.`, `She has danced ballet.`],
    // [`We paint pictures.`, `We have painted pictures.`],
    // [`I play soccer.`, `I have played soccer.`],
    // [`They study history.`, `They have studied history.`],
    // [`He cooks dinner.`, `He has cooked dinner.`],
    // [`She designs websites.`, `She has designed websites.`],
    // [`We watch movies.`, `We have watched movies.`],
    // [`You listen to music.`, `You have listened to music.`],
    // [`They build houses.`, `They have built houses.`],
    // [`I plant flowers.`, `I have planted flowers.`],
    // [`He fixes cars.`, `He has fixed cars.`],
    // [`She teaches math.`, `She has taught math.`],
    // [`We clean the house.`, `We have cleaned the house.`],
    // [`You drive a car.`, `You have driven a car.`],
    // [`They ride bikes.`, `They have ridden bikes.`],
    // [`I take photos.`, `I have taken photos.`],
    // [`She does yoga.`, `She has done yoga.`],
    // [`We sing in the choir.`, `We have sung in the choir.`],
    // [`You draw pictures.`, `You have drawn pictures.`],
    // [`They make cookies.`, `They have made cookies.`],
    // [`He surfs the internet.`, `He has surfed the internet.`],
    // [`She plays the guitar.`, `She has played the guitar.`],
    // [`We travel the world.`, `We have traveled the world.`],
    // [`You speak to friends.`, `You have spoken to friends.`],
    // [`They fish in the river.`, `They have fished in the river.`],
    // [`I write stories.`, `I have written stories.`],
    // [`He takes a shower.`, `He has taken a shower.`],
    // [`She sews clothes.`, `She has sewn clothes.`],
    // [`We play board games.`, `We have played board games.`],
    // [`You exercise at the gym.`, `You have exercised at the gym.`],
    // [`They fly airplanes.`, `They have flown airplanes.`],
    // [`He studies science.`, `He has studied science`],
    // ["I sing in the shower.", "I have sung in the shower."],
    // ["The sun shines brightly.", "The sun has shone brightly."],
    // ["He eats a lot of vegetables.", "He has eaten a lot of vegetables."],
    // ["We write a letter to our grandparents.", "We have written letters to our grandparents."],
    // ["The dog barks loudly.", "The dog has barked loudly."],
    // ["They play soccer every weekend.", "They have played soccer every weekend."],
    // ["She speaks Spanish fluently.", "She has spoken Spanish fluently."],
    // ["He teaches math at the local college.", "He has taught math at the local college."],
    // ["The tree grows tall.", "The tree has grown tall."],
    // ["The bird chirps early in the morning.", "The bird has chirped early in the morning."],
    // ["The flower smells sweet.", "The flower has smelled sweet."],
    // ["I play the guitar.", "I have played the guitar for years."],
    // ["The wind blows gently.", "The wind has blown gently."],
    // ["the tree will grow", "the tree had grown"],
    // ["the tree grows quickly", "the tree had grown quickly"],
    // ["She will have eaten", "She had eaten"],
    // ["They will have finished", "They had finished"],
    // ["He will have written", "He had written"],
    // ["We will have seen", "We had seen"],
    // ["You will have spoken", "You had spoken"],

    // ["She reads a book every night.", "She has read a book every night."],
    // ["I always forget my keys.", "I have always forgotten my keys "],
    // ["She paints beautiful pictures.", "She has painted beautiful pictures."],
    // ["He drives a fast car.", "He has driven a fast car."],
    // ["I clean the house every weekend.", "I have cleaned the house every weekend."],
    // ["She dances gracefully.", "She has danced gracefully"],
    // ["He flies to New York for business.", "He has flown to New York for business."],
    // ["We swim in the pool on hot days.", "We have swum in the pool on hot days."],
    // ["They run a marathon every year.", "They have run a marathon every year."],
    // ["She sews her own clothes.", "She has sewn her own clothes"],
    // ["He builds houses for a living.", "He has built houses for a living."],
    // ["We drink coffee every morning.", "We have drunk coffee every morning."],
    // ["They watch movies on Friday nights.", "They have watched movies on Friday nights."],
    // ["She designs jewelry for a living.", "She has designed jewelry for a living."],
    // ["He studies biology in college.", "He has studied biology in college."],
    // ["We take walks in the park.", "We have taken walks in the park."],
    // ["They listen to music on their way to work.", "They have listened to music on their way to work."],
    // ["She cooks dinner for her family.", "She has cooked dinner for her family"],


    // ['i take', 'i had taken'],
    // ['i write', 'i had written'],
    // ['i make', 'i had made'],
    // ['i agree', 'i had agreed'],
    // ['i catch', 'i had caught'],
    // ['i do', 'i had done'],
    // ['i break', 'i had broken'],
    // ['i forget', 'i had forgotten'],
    // ['i move', 'i had moved'],
    // ['i understand', 'i had understood'],
    // ['i open', 'i had opened'],
    // ['i fill', 'i had filled'],
    // ['i speak', 'i had spoken'],
    // ['i put', 'i had put'],
    // ['i walk', 'i had walked'],
    // ['i meet', 'i had met'],
    // ['i fly', 'i had flown'],
    // ['i keep', 'i had kept'],
    // ['i show', 'i had shown'],
    // ['i hear', 'i had heard'],
    // ['i come', 'i had come'],
    // ['i trust', 'i had trusted'],
    // ['i turn', 'i had turned'],
    // ['i run', 'i had run'],
    // ['i fall', 'i had fallen'],
    // ['i find', 'i had found'],
    // ['i give', 'i had given'],
    // ['i cause', 'i had caused'],
    // ['i become', 'i had become'],
    // ['i stand', 'i had stood'],
    // ['i sit', 'i had sat'],
    // ['i leave', 'i had left'],
    // ['i stop', 'i had stopped'],
    // ['i plan', 'i had planned'],
    // ['i live', 'i had lived'],
    // ['i build', 'i had built'],
    // ['i suggest', 'i had suggested'],
    // ['i hold', 'i had held'],
    // ['i look', 'i had looked'],
    // ['i lie', 'i had lain'],
    // ['i hope', 'i had hoped'],
    // ['i bring', 'i had brought'],
    // ['i ask', 'i had asked'],
    // ['i seem', 'i had seemed'],
    // ['i include', 'i had included'],
    // ['i understand', 'i had understood'],
    // ['i consider', 'i had considered'],
    // ['i realize', 'i had realized'],
    // ['i follow', 'i had followed'],
    // ['i bring', 'i had brought'],
    // ['i think', 'i had thought'],
    // ['i explain', 'i had explained'],
    // ['i explain', 'i had explained'],
    // ['i point', 'i had pointed'],
    // ['i choose', 'i had chosen'],
    // ['i play', 'i had played'],
    // ['i try', 'i had tried'],
    // ['i study', 'i had studied'],
    // ['i wear', 'i had worn'],
    // ['i act', 'i had acted'],
    // ['i help', 'i had helped'],
    // ['i remember', 'i had remembered'],
    // ['i call', 'i had called'],
    // ['i remove', 'i had removed'],
    // ['i accept', 'i had accepted'],
    // ['i prepare', 'i had prepared'],
    // ['i prepare', 'i had prepared'],
    // ['i support', 'i had supported'],
    // ['i increase', 'i had increased'],
    // ['i mean', 'i had meant'],
    // ['i meet', 'i had met'],
    // ['i add', 'i had added'],
    // ['i lose', 'i had lost'],
    // ['i appear', 'i had appeared'],
    // ['i develop', 'i had developed'],
    // ['i reach', 'i had reached'],
    // ['i use', 'i had used'],
    // ['i like', 'i had liked'],
    // ['i choose', 'i had chosen'],
    // ['i continue', 'i had continued'],
    // ['i create', 'i had created'],
    // ['i deal', 'i had dealt'],
    // ['i cause', 'i had caused'],
    // ['i set', 'i had set'],
    // ['i allow', 'i had allowed'],
    // ['i notice', 'i had noticed'],
    // ['i take', 'i had taken'],
    // ['i save', 'i had saved'],
    // ['i spend', 'i had spent'],
    // ['i suffer', 'i had suffered'],
    // ['i provide', 'i had provided'],
    // ['i reach', 'i had reached'],
    // ['i contain', 'i had contained'],
    // ['i include', 'i had included'],
    // ['i finish', 'i had finished'],
    // ['i face', 'i had faced'],
    // ['i explain', 'i had explained'],
    // ['i mention', 'i had mentioned'],
    // ['i form', 'i had formed'],
    // ['i examine', 'i had examined'],
    // ['i consider', 'i had considered'],
    // ['i cost', 'i had cost'],
    // ['i determine', 'i had determined'],
    // ['i require', 'i had required'],
    // ['i exist', 'i had existed'],
    // ['i remain', 'i had remained'],
    // ['i involve', 'i had involved'],
    // ['i reduce', 'i had reduced'],
    // ['i establish', 'i had established'],
    // ['i protect', 'i had protected'],
    // ['i cause', 'i had caused'],
    // ['i represent', 'i had represented'],
    // ['i indicate', 'i had indicated'],
    // ['i determine', 'i had determined'],
    // ['i apply', 'i had applied'],
    // ['i increase', 'i had increased'],
    // ['i base', 'i had based'],
    // ['i answer', 'i had answered'],
    // ['i cover', 'i had covered'],
    // ['i show', 'i had shown'],
    // ['i involve', 'i had involved'],
    ['i notice', 'i had noticed'],
    // ['i understand', 'i had understood'],
    // ['i pass', 'i had passed'],
    // ['i permit', 'i had permitted'],
    // ['i prefer', 'i had preferred'],
    // ['i contain', 'i had contained'],
    // ['i represent', 'i had represented'],
    // ['i change', 'i had changed'],
    // ['i recognize', 'i had recognized'],
    // ['i refer', 'i had referred'],
    // ['i decide', 'i had decided'],
    // ['i estimate', 'i had estimated'],
    // ['i discuss', 'i had discussed'],
    // ['i observe', 'i had observed'],
    // ['i receive', 'i had received'],
    // ['i include', 'i had included'],
    // ['i consider', 'i had considered'],
    // ['i affect', 'i had affected'],
    // ['i agree', 'i had agreed'],
    // ['i understand', 'i had understood'],
    // ['i happen', 'i had happened'],
    // ['i produce', 'i had produced'],
    // ['i perform', 'i had performed'],
    // ['i connect', 'i had connected'],
    // ['i resist', 'i had resisted'],
    // ['i consider', 'i had considered'],
    // ['i regard', 'i had regarded'],
    // ['i occur', 'i had occurred'],
    // ['i relate', 'i had related'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toPastParticiple()
    t.equal(doc.text(), a[1], here + ' ' + a[0])
  })
  t.end()
})


test('past vs past-participle:', function (t) {
  let arr = [
    ['arise', 'arose', 'arisen'],
    ['awake', 'awoke', 'awoken'],
    ['bear', 'bore', 'born'],
    ['beat', 'beat', 'beaten'],
    ['become', 'became', 'become'],
    ['bet', 'bet', 'bet'],
    ['bid', 'bid', 'bid'],
    ['bind', 'bound', 'bound'],
    ['bleed', 'bled', 'bled'],
    ['blow', 'blew', 'blown'],
    ['break', 'broke', 'broken'],
    ['breed', 'bred', 'bred'],
    ['bring', 'brought', 'brought'],
    ['build', 'built', 'built'],
    ['burst', 'burst', 'burst'],
    ['catch', 'caught', 'caught'],
    ['choose', 'chose', 'chosen'],
    ['cling', 'clung', 'clung'],
    ['come', 'came', 'come'],
    ['cost', 'cost', 'cost'],
    ['creep', 'crept', 'crept'],
    ['deal', 'dealt', 'dealt'],
    ['dig', 'dug', 'dug'],
    ['do', 'did', 'done'],
    ['draw', 'drew', 'drawn'],
    ['dream', 'dreamed', 'dreamed'],
    ['drink', 'drank', 'drunk'],
    ['drive', 'drove', 'driven'],
    ['eat', 'ate', 'eaten'],
    ['fall', 'fell', 'fallen'],
    ['feed', 'fed', 'fed'],
    ['fight', 'fought', 'fought'],
    ['find', 'found', 'found'],
    ['flee', 'fled', 'fled'],
    ['fling', 'flung', 'flung'],
    ['fly', 'flew', 'flown'],
    ['forget', 'forgot', 'forgotten'],
    ['forgive', 'forgave', 'forgiven'],
    ['forsake', 'forsaken', 'forsaken'],
    ['freeze', 'froze', 'frozen'],
    ['give', 'gave', 'given'],
    ['go', 'went', 'gone'],
    ['grow', 'grew', 'grown'],
    ['hang', 'hung', 'hung'],
    ['have', 'had', 'had'],
    ['hide', 'hid', 'hidden'],
    ['hold', 'held', 'held'],
    ['keep', 'kept', 'kept'],
    ['know', 'knew', 'known'],
    ['leave', 'left', 'left'],
    ['lend', 'lent', 'lent'],
    ['light', 'lit', 'lit'],
    ['make', 'made', 'made'],
    ['meet', 'met', 'met'],
    ['prove', 'proved', 'proven'],
    ['read', 'read', 'read'],
    ['ride', 'rode', 'ridden'],
    ['ring', 'rang', 'rung'],
    ['rise', 'rose', 'risen'],
    ['run', 'ran', 'run'],
    ['say', 'said', 'said'],
    ['see', 'saw', 'seen'],
    ['seek', 'sought', 'sought'],
    ['set', 'set', 'set'],
    ['shake', 'shook', 'shaken'],
    ['shine', 'shone', 'shone'],
    ['shoot', 'shot', 'shot'],
    ['show', 'showed', 'shown'],
    ['sing', 'sang', 'sung'],
    ['sink', 'sank', 'sunk'],
    ['sit', 'sat', 'sat'],
    ['sleep', 'slept', 'slept'],
    ['speak', 'spoke', 'spoken'],
    ['spend', 'spent', 'spent'],
    ['spread', 'spread', 'spread'],
    ['stand', 'stood', 'stood'],
    ['steal', 'stole', 'stolen'],
    ['stick', 'stuck', 'stuck'],
    ['strike', 'struck', 'struck'],
    ['swear', 'swore', 'sworn'],
    ['swim', 'swam', 'swum'],
    ['take', 'took', 'taken'],
    ['teach', 'taught', 'taught'],
    ['tear', 'tore', 'torn'],
    ['tell', 'told', 'told'],
    ['think', 'thought', 'thought'],
    ['throw', 'threw', 'thrown'],
    ['understand', 'understood', 'understood'],
    ['wake', 'woke', 'woken'],
    ['wear', 'wore', 'worn'],
    ['win', 'won', 'won'],
    ['write', 'wrote', 'written'],
  ]
  arr.forEach(a => {
    let [present, past, participle] = a
    let doc = nlp(present).tag('#Infinitive')
    let obj = doc.verbs().conjugate()[0] || {}
    t.equal(obj.PastTense, past, here + ' ' + a[0])

    // let prt = obj.Participle || obj.PastTense || ''
    // prt = prt.replace(/^had /, '')
    // t.equal(prt, participle, here + ' ' + a[0])
  })
  t.end()
})



