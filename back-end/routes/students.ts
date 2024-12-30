import express from 'express';
import { Student } from '../models/Student';
import { sequelize } from '../db';

const router = express.Router();

// Route pour récupérer la répartition des étudiants par classe
router.get('/api/students/repartition', async (req, res) => {
  try {
    const classCounts = await Student.findAll({
      attributes: ['class', [sequelize.fn('COUNT', sequelize.col('class')), 'count']],
      group: ['class'],
      raw: true,
    });

    const data = classCounts.map((item: any) => [item.class, parseInt(item.count)]);

    res.json(data);
  } catch (err) {
    console.error('Erreur lors de la récupération des données des étudiants :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;

