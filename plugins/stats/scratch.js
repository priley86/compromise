/* eslint-disable no-console, no-unused-vars */
// import corpus from 'nlp-corpus'
import nlp from '../../src/three.js'
import plugin from './src/plugin.js'
nlp.extend(plugin)

// let txt = 'toronto raptors play a toronto maple leafs'
// let doc = nlp(txt)
// console.log(doc.ngram())

let txt = 'i think we see that fook are nice. foopsie are cool'

let doc = nlp(txt)
console.log(doc.tfidf())
// doc.compute('tfidf')
// console.log(doc.json()[0])