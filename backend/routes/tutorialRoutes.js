'use strict';

import { Router } from 'express';
import tutorialController from '../controllers/tutorialController.js';

// create router object server uses to serve the required resources

const router = Router();

// Create a new Tutorial
router.post("/", (req, res) => tutorialController.createTutorial(req, res));

// Retrieve all Tutorials
// router.get("/", tutorials.findAll);
router.get("/", (req, res) => tutorialController.getAllTutorials(req, res));

// Delete all Tutorials
router.get("/deleteall", (req, res) => tutorialController.deleteAllTutorials(req, res));

// Retrieve all published Tutorials
router.get("/published", (req, res) => tutorialController.findAllPublished(req, res));

// Retrieve tutorial count
router.get("/tutorialcount", (req, res) => tutorialController.tutorialCount(req, res));


// Retrieve a single Tutorial with id
router.get("/:id", (req, res) => tutorialController.findOneTutorial(req, res));

// Update a Tutorial with id
router.put("/:id", (req, res) => tutorialController.updateTutorial(req, res));

// Delete a Tutorial with id
router.delete("/:id", (req, res) => tutorialController.deleteTutorial(req, res));


export default router