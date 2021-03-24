const path = require('path');
const fs = require('fs');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
  )

class Card {

static async add(course) {
    const card = await Card.fetch();
    const idx = card.courses.findIndex(c => c.id === course.id);
    const candidate = card.courses[idx];
    console.log(candidate)
    if (candidate) {
        candidate.count++;
        card.courses[idx] = candidate; 
    } else {
        course.count = 1;
        card.courses.push(course);
    }

    card.cost += +course.cost;
    
    return new Promise((resolve, reject) => {
        fs.writeFile(p, JSON.stringify(card), err => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
}

static async fetch() {
    return new Promise((resolve, reject) => {
        fs.readFile(p, 'utf-8', (err, content) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(content));
            }
        })
    })
}

static async remove(id) {
  const card = await Card.fetch();
  console.log(card)
  const idx = card.courses.findIndex(c => c.id === id);
  console.log(idx)
  const course = card.courses[idx]
  console.log(course)
  console.log("HERE");
  if (course.count === 1) {
    console.log("1");
    card.courses = card.courses.filter(c => c.id !== id)
  } else {
    console.log(">1");
    card.courses[idx].count--;
  }

  card.cost -= course.cost
 
  return new Promise((resolve, reject) => {
    fs.writeFile(p, JSON.stringify(card), err => {
      if (err) {
        reject(err)
      } else {
        resolve(card)
      }
    })
  })
} 

}

module.exports = Card