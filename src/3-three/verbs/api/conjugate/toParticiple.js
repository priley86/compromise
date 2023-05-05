import { noop, getTense } from '../lib.js'

//  'have/had/has eaten'
const haveHadHas = function (all) {
  let w = 'have'
  if (all.Participle !== all.PastTense) {
    w = 'had'
  }
  return w
}

const fns = {


  // walk->walked
  simple: (vb, parsed) => {
    const { conjugate, toInfinitive } = vb.methods.two.transform.verb
    const { root, auxiliary } = parsed
    // 'i may'
    if (root.has('#Modal')) {
      return vb
    }
    let str = root.text({ keepPunct: false })
    str = toInfinitive(str, vb.model, getTense(root))
    let all = conjugate(str, vb.model)
    // 'driven' || 'drove'
    str = all.Participle || all.PastTense

    if (str) {
      vb = vb.replace(root, str)
      // 'have/had/has eaten'
      let have = haveHadHas(all)
      vb.prepend(have).match(have).tag('Auxiliary')
      vb.remove(auxiliary)
    }

    return vb
  },


}


const forms = {
  // walk -> walked
  'infinitive': fns.simple,
  // he walks -> he walked
  'simple-present': fns.simple,
  // he walked
  // 'simple-past': noop,
  // he will walk -> he walked
  // 'simple-future': noop,

  // he is walking
  // 'present-progressive': noop,
  // he was walking
  // 'past-progressive': noop,
  // he will be walking
  // 'future-progressive': noop,

  // has walked -> had walked (?)
  // 'present-perfect': noop,
  // had walked
  // 'past-perfect': noop,
  // will have walked -> had walked
  // 'future-perfect': noop,

  // has been walking -> had been
  // 'present-perfect-progressive': noop,
  // had been walking
  // 'past-perfect-progressive': noop,
  // will have been -> had
  // 'future-perfect-progressive': noop,

  // got walked
  // 'passive-past': noop,
  // is being walked  -> 'was being walked'
  // 'passive-present': noop,
  // will be walked -> had been walked
  // 'passive-future': noop,

  // would be walked -> 'would have been walked'
  // 'present-conditional': noop,
  // would have been walked
  // 'past-conditional': noop,

  // is going to drink -> was going to drink
  // 'auxiliary-future': noop,
  // used to walk
  // 'auxiliary-past': noop,
  // we do walk -> we did walk
  // 'auxiliary-present': noop,

  // must walk -> 'must have walked'
  // 'modal-infinitive': noop,
  // must have walked
  // 'modal-past': noop,
  // wanted to walk
  // 'want-infinitive': noop,
  // started looking
  // 'gerund-phrase': noop,
}

const toPast = function (vb, parsed, form) {
  // console.log(form)
  if (forms.hasOwnProperty(form)) {
    vb = forms[form](vb, parsed)
    vb.fullSentence().compute(['tagger', 'chunks'])
    return vb
  }
  // do the simple form
  vb = fns.simple(vb, parsed)
  vb.fullSentence().compute(['tagger', 'chunks'])
  // do nothing i guess?
  return vb
}
export default toPast
