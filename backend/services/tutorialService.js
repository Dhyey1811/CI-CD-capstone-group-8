
// backend/controllers/TutorialController.js
'use strict';

import Tutorial from "../models/tutorialModel.js";
class TutorialController {
    async getAllTutorials() {
        return await Tutorial.findAll({ order: [['id', 'DESC']] });

    }

    async findOneTutorial(id) {
        const tutorial = await Tutorial.findByPk(id)

        if (!tutorial) {
            throw new Error('Tutorial not found')
        }
        return tutorial

    }

    // create a tutorial
    async createTutorial(tutorialData) {
        if (!tutorialData.title || tutorialData.title.trim() === '') {
            throw new Error('title is required')
        }
        if (!tutorialData.description || tutorialData.description.trim() === '') {
            throw new Error('description is required')
        }

        return await Tutorial.create({
            title: tutorialData.title.trim(),
            description: tutorialData.description.trim(),
            published: tutorialData.published || false
        })

    }
    // update a tutorial 
    async updateTutorial(id, updateData) {

        const tutorial = await this.findOneTutorial(id) //returns an error if no tutorial with the id exists
        if (updateData.title !== undefined && updateData.title.trim() === '') {
            throw new Error('Title cannot be empty');
        }

        if (updateData.description !== undefined && updateData.description.trim() === '') {
            throw new Error('Description cannot be empty');
        }

        return await tutorial.update({
            title: updateData.title.trim(),
            description: updateData.description.trim(),
            published: updateData.published || false
        });
    }

    // delete a tutorial
    async deleteTutorial(id) {
        const tutorial = await this.findOneTutorial(id) //returns an error if no tutorial with the id exists

        await tutorial.destroy();
        return { message: "Tutorial deleted successfully" };
    }

    // get number of all tutorials
    async tutorialCount() {
        return await Tutorial.count();
        // return await this.getAllTutorials.count();

    }

    // Delete all Tutorials from the database.
    async deleteAllTutorials() {
        const numDeleted= await Tutorial.destroy({
            where: {},
            truncate: false
        })

        return numDeleted

    };

    // find all published Tutorial
    async findAllPublished() {
        return Tutorial.findAll({ where: { published: true } })

    };
}

export default new TutorialController();



