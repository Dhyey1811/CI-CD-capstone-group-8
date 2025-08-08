//models/tutorialModel.js
"use strict"
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const Tutorial = sequelize.define("tutorial", {
  title: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  published: {
    type: DataTypes.BOOLEAN, 
    defaultValue: false,

  }
});
export default Tutorial;