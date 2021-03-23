const uuid = require('uuid')
const fs = require('fs')
const path = require('path')

class Course {
    constructor(title, cost, img) {
        this.title = title
        this.cost = cost
        this.img = img
        this.id = uuid.v4()
    }   

    toJSON() {
        return ({
            title: this.title,
            cost: this.cost,
            img: this.img,
            id: this.id
        })
    }
    
   async save() {
        const courses = await Course.getAll();
        courses.push(this.toJSON());

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'), 
            JSON.stringify(courses), 
            (err) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve()
                }
                
            })
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'),
            'utf-8',
            (err, content) => {
               if (err) reject(err)
               else {
                resolve(JSON.parse(content))
               }
            })
        })
    }

    static async update(course) {
        const courses = await this.getAll();

        const idx = courses.findIndex(c => c.id === course.id);
        courses[idx] = course;

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'), 
            JSON.stringify(courses), 
            (err) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve()
                }
                
            })
        })
    }

    static async getById (id) {
        const courses = await this.getAll();
        return courses.find(course => course.id === id)
    }
}

module.exports = Course;