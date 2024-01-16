import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/is-has] '

test('is-has', function (t) {
  let arr = [
    ["Artist's creative process is unique to each individual", '#Possessive'],
    ["Athlete's dedication often leads to success", '#Possessive'],
    ["Baby's first steps are always memorable", '#Possessive'],
    ["He's a professional photographer", 'is'],
    ["He's a talented musician", 'is'],
    ["He's always been a good friend", 'has'],
    ["He's always on time", 'is'],
    ["He's an excellent cook", 'is'],
    ["He's become a successful entrepreneur", 'has'],
    ["He's feeling much better", 'is'],
    ["He's got a new job", 'has'],
    ["He's lived here for years", 'has'],
    // ["He's never let us down before", 'has'],
    ["He's never met her before", 'has'],
    ["He's never seen such a beautiful sunset", 'has'],
    ["He's studying for the exam", 'is'],
    ["He's the captain of the team", 'is'],
    ["He's the one in charge", 'is'],
    ["He's the one who called", 'is'],
    ["He's very talented", 'is'],
    ["It's a beautiful morning", 'is'],
    ["It's important to stay focused", 'is'],
    ["It's not as easy as it looks", 'is'],
    ["It's not what it seems", 'is'],
    ["It's not what it used to be", 'is'],
    ["It's raining outside", 'is'],
    ["It's your turn to speak", 'is'],
    ["Jamaica's growing rapidly", 'is'],
    ["John's car is parked outside", '#Possessive'],
    ["john's closed tasks", 'has'],
    ["John's finished his homework", 'has'],
    ["John's guitar is in the corner", '#Possessive'],
    ["John's house is very warm", '#Possessive'],
    ["John's nuts about Georgia", 'is'],
    ["John's nuts were roasting", '#Possessive'],
    ["John's nuts had been salted", '#Possessive'],
    ["John's quickly running", 'is'],
    ["Mary's visited Paris before", 'has'],
    ["My sister's birthday is next week", '#Possessive'],
    ["My sister's wedding is next month", '#Possessive'],
    ["Professor's office hours are posted on the door", '#Possessive'],
    ["Restaurant's signature dish is a customer favorite", '#Possessive'],
    ["She's a talented artist", 'is'],
    ["She's already finished her homework", 'has'],
    ["She's always been a fast learner", 'has'],
    ["She's always been a good listener", 'has'],
    ["She's always been a hard worker", 'has'],
    ["She's been a great friend", 'has'],
    ["She's been to Europe several times", 'has'],
    ["She's been working all day", 'has'],
    ["She's excited about the trip", 'is'],
    ["She's finished her degree", 'has'],
    ["She's finished her work", 'has'],
    ["She's got a lot of experience", 'has'],
    ["She's got a lot of friends", 'has'],
    ["She's got a new car", 'has'],
    ["She's got a talent for singing", 'has'],
    ["She's lost her keys again", 'has'],
    ["She's never been to Asia", 'has'],
    ["She's never seen such a beautiful sunset", 'has'],
    ["She's never tasted sushi before", 'has'],
    ["She's reached her goal", 'has'],
    ["She's the one who called", 'is'],
    ["She's the one who organized the event", 'is'],
    ["Student's question sparked an interesting discussion", '#Possessive'],
    ["The architect's plans were carefully drawn", '#Possessive'],
    ["The architect's vision is reflected in the design", '#Possessive'],
    ["The artist's gallery displayed stunning works", '#Possessive'],
    ["The artist's painting is on display", '#Possessive'],
    ["The artist's technique is unique", '#Possessive'],
    ["The assignment's due tomorrow", 'is'],
    ["The athlete's dedication is inspiring", '#Possessive'],
    ["The author's storytelling is captivating", '#Possessive'],
    ["The baby's crying in the crib", 'is'],
    ["The baby's first steps are exciting", '#Possessive'],
    ["The baby's learned to crawl", 'has'],
    ["The baby's room needs redecorating", '#Possessive'],
    ["The book's been on the bestseller list", 'has'],
    ["The book's missing a few chapters", 'is'],
    ["The book's missing a few pages", 'is'],
    ["The building's foundation is strong", '#Possessive'],
    ["The cake's already been eaten", 'has'],
    ["The cake's been eaten", 'has'],
    ["The captain's chair was empty", '#Possessive'],
    ["The captain's leadership is crucial", '#Possessive'],
    ["The captain's orders were clear", '#Possessive'],
    ["The car's engine is making a strange noise", 'is'],
    ["The car's engine needs maintenance", '#Possessive'],
    ["The car's engine roared to life", '#Possessive'],
    ["The car's out of gas", 'is'],
    ["The car's parked in the garage", 'is'],
    ["The car's sleek design caught everyone's attention", '#Possessive'],
    ["The cat's asleep on the windowsill", 'is'],
    ["The cat's eyes gleamed in the darkness", '#Possessive'],
    ["The cat's eyes sparkled in the moonlight", '#Possessive'],
    ["The cat's fur is soft", '#Possessive'],
    ["The cat's hiding under the table", 'is'],
    ["The cat's playful antics amused everyone", '#Possessive'],
    ["The cat's sleeping on the roof", 'is'],
    ["The CEO's decision impacted the entire company", '#Possessive'],
    ["The chef's recipe is a closely guarded secret", '#Possessive'],
    ["The child's imagination is vivid", '#Possessive'],
    ["The child's innocence is heartwarming", '#Possessive'],
    ["The child's laughter is infectious", '#Possessive'],
    ["The city's population is growing", '#Possessive'],
    ["The city's skyline is breathtaking", '#Possessive'],
    ["The coffee's aroma filled the room", '#Possessive'],
    ["The coffee's too hot to drink", 'is'],
    ["The coffee's too hot", 'is'],
    ["The company's CEO is giving a speech", '#Possessive'],
    ["The company's expanding globally", 'is'],
    ["The company's expanding rapidly", 'is'],
    ["The company's headquarters are in the city", '#Possessive'],
    ["The company's success is remarkable", '#Possessive'],
    ["The computer's crashed again", 'has'],
    ["The concert's sold out", 'is'],
    ["The concert's starting soon", 'is'],
    ["The detective's intuition was sharp", '#Possessive'],
    ["The doctor's advice was helpful", '#Possessive'],
    ["The doctor's diagnosis was accurate", '#Possessive'],
    ["The dog's barking in the backyard", 'is'],
    ["The dog's behavior is unpredictable", '#Possessive'],
    ["The dog's chasing its tail", 'is'],
    ["The dog's collar is missing", '#Possessive'],
    ["The engineer's design was innovative", '#Possessive'],
    ["The explorer's journey was filled with challenges", '#Possessive'],
    ["The explorer's map guided the journey", '#Possessive'],
    ["The farmer's crops were ready for harvest", '#Possessive'],
    ["The food's ready to be served", 'is'],
    ["The garden's beauty is captivating", '#Possessive'],
    ["The garden's flowers are in full bloom", '#Possessive'],
    ["The journalist's story was front-page news", '#Possessive'],
    ["The lawyer's argument was persuasive", '#Possessive'],
    ["The lawyer's argument won the case", '#Possessive'],
    ["The librarian's knowledge of books was vast", '#Possessive'],
    ["The manager's decision was unexpected", '#Possessive'],
    ["The meeting's been rescheduled", 'has'],
    ["The meeting's scheduled for 3 PM", 'is'],
    ["The mountain's peak is covered in snow", '#Possessive'],
    ["The movie's already started", 'has'],
    ["The musician's talent is evident", '#Possessive'],
    ["The novel's plot is intriguing", '#Possessive'],
    ["The nurse's care was comforting", '#Possessive'],
    ["The package's arrived on time", 'has'],
    ["The package's arrived", 'has'],
    ["The plane's just landed", 'has'],
    ["The professor's lecture was enlightening", '#Possessive'],
    ["The professor's lecture was informative", '#Possessive'],
    ["The project's almost complete", 'is'],
    ["The project's already started", 'has'],
    ["The project's behind schedule", 'is'],
    ["The project's completed on time", 'has'],
    ["The project's completion is imminent", '#Possessive'],
    ["The scientist's discovery is groundbreaking", '#Possessive'],
    ["The scientist's experiment yielded interesting results", '#Possessive'],
    ["The scientist's research is groundbreaking", '#Possessive'],
    ["The software's being updated", 'is'],
    ["The store's closed on Sundays", 'is'],
    ["The student's backpack is in the hallway", '#Possessive'],
    ["The student's question was thought-provoking", '#Possessive'],
    ["The student's understanding is impressive", '#Possessive'],
    ["The sun's setting", 'is'],
    ["The sun's shining brightly", 'is'],
    ["The teacher's guidance is invaluable", '#Possessive'],
    ["The team's strategy is well-thought-out", '#Possessive'],
    ["The team's unity is commendable", '#Possessive'],
    ["The team's won every game this season", 'has'],
    ["The team's won the championship", 'has'],
    ["The train's already left the station", 'has'],
    ["The weather's getting colder", 'is'],
    ["They're convinced he's innocent", 'is'],

    ["the cell's natural", 'is'],
    ["the cell's natural mechanisms", '#Possessive'],
    ["the field's leading proponents", '#Possessive'],
    ["the rocket's red glare", '#Possessive'],
    ["the rocket's glare", '#Possessive'],
    ["the rocket's red", 'is'],
    ["Everybody's waiting up to hear ", 'is'],
    ["this truck's close proximity", '#Possessive'],
    ["causing a patient's secondary rhinitis", '#Possessive'],
    ["Prince Ahmed's natural disposition", '#Possessive'],
    ["that genre's stylistic achievements", '#Possessive'],
    ["picking up on Jeramie's quick explanations", '#Possessive'],
    [`This company's "Natural Soda"`, '#Possessive'],
    [`Toronto's loudest singing group `, '#Possessive'],
    [`Drake's rich album cover`, '#Possessive'],
    [`a role in Los Angeles's cultural identity`, '#Possessive'],
    [`this artist's painting of his "Anatomy Lesson" `, '#Possessive'],
    [`the Art Institute of Chicago's Building `, '#Possessive'],
    [`it features Cody's chanting. `, '#Possessive'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    t.equal(doc.has(a[1]), true, here + ' (' + a[1] + ')  ' + a[0])
  })
  t.end()
})
