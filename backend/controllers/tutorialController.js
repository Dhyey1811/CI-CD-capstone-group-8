'use strict';

import tutorialService from '../services/tutorialService.js';

class TutorialController {


    // create and save the new tutorial using the service layer.
    async createTutorial(req, res) {
        try {
            // receive the new tutorial data from the request body

            const { title, description, published } = req.body;

            // use the service layer to create the new tutorial
            const newTutorial = await tutorialService.createTutorial({ title, description, published })
            // send the new tutorial as a json responce
            return res.status(201).json(newTutorial)

        } catch (error) {

            console.error('A server error occured:', error)
            return res.status(500).json({ error: 'The server sent back an error' })

        }
    }

    // Retrieve all Tutorials from the database.
    async getAllTutorials(_req, res) {

        try {
            // retrieve the tutorials from the database
            const tutorials = await tutorialService.getAllTutorials();
            return res.json(tutorials)

        } catch (error) {
            console.error('A server error occured:', error)
            return res.status(500).json({ error: 'The server sent back an error' })
        }
    }

    // Find a single Tutorial with an id
    async findOneTutorial(req, res) {
        try {

            // retrieve the specific id for the tutorial from the request body 
            // ensure you parse it prevent errors
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid ID Provided' });
            }

            // if id is valid, use it to get the specific tutorial from the service layer 
            const tutorial = await tutorialService.findOneTutorial(id)
            return res.json(tutorial);

        } catch (error) {
            if (error.message === 'Tutorial not found') {
                return res.status(404).json({ error: error.message });
            }
            console.error('A server error occured:', error)
            return res.status(500).json({ error: 'The server sent back an error' })
        }
    }
    // Update a Tutorial by the id in the request

    async updateTutorial(req, res) {
        try {
            // retrieve the specific id for the tutorial from the request body 
            // ensure you parse it prevent errors

            // receive the new tutorial data from the request body
            const { title, description, published } = req.body;

            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid ID Provided' });
            }

            // if id is valid, use it to update the specific tutorial from the service layer 
            const newTutorial = await tutorialService.updateTutorial(id, { title, description, published })

            return res.json(newTutorial);


        } catch (error) {

            if (error.message === 'Tutorial not found') {
                return res.status(404).json({ error: error.message });
            }
            if (error.message === 'Title cannot be empty') {
                return res.status(400).json({ error: error.message });
            }
            if (error.message === 'Description cannot be empty') {
                return res.status(400).json({ error: error.message });
            }
            console.error('A server error occured:', error)
            return res.status(500).json({ error: 'The server sent back an error' })

        }
    }

    // Delete a Tutorial with the specified id in the request
    async deleteTutorial(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid ID Provided' });
            }

            await tutorialService.deleteTutorial(id);
            return res.status(204).send()

        } catch (error) {
            if (error.message === 'Tutorial not found') {
                return res.status(404).json({ error: error.message });
            }
            console.error('A server error occured:', error)
            return res.status(500).json({ error: 'The server sent back an error' })
        }
    }

    // Get count of tutorials 
    async tutorialCount(_req, res) {
        try {
            const tutorialcount = await tutorialService.tutorialCount();
            return res.json({ tutorialcount })
        } catch (error) {
            console.error('A server error occured:', error)
            return res.status(500).json({ error: 'The server sent back an error' })

        }
    }

    // Delete all Tutorials from the database.
    async deleteAllTutorials(_req, res) {
        try {
            const numsOfDeteletedTutorial = await tutorialService.deleteAllTutorials(_req, res);

            return res.json({ numsOfDeteletedTutorial });
        } catch (error) {
            res.status(500).json({
                error: "Some error occurred while removing all tutorials."
            });
            console.error('An error occured while removing all tutorials:', error)

        };
    };

    // find all published Tutorial
    async findAllPublished(_req, res) {
        try {
            const allPublishedTutorial = await tutorialService.findAllPublished(_req, res)

            return res.json(allPublishedTutorial)
        }
        catch (error) {
            return res.status(500).json({
                error: "Some error occurred while geting all tutorials."
            });
        };
    };
}

export default new TutorialController();
