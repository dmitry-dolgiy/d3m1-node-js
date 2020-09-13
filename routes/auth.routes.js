const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require("config");
const router = Router();

router.post(
	'/register',
	[
		check({ 'email': 'Некорректный email' }).isEmail(),
		check({ 'password': 'Мало, очень мало знаков, КАРЛ!' }).isLength({ min: 6 })
	],
	async (req, res) => {
		try {
			const { body: { email, password } } = req
			const errors = validationResult(req)
			
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некоректные данные',
				})
			}
			const candidate = User.findOne({ email })
			if (candidate) {
				return res.status(400).message('Такой пользователь уже существует!')
			}
			
			const hashedPassword = await bcrypt.hash(password, 12)
			const user = new User({ email, password, hashedPassword })
			await user.save()
			
			res.status(201).message('Пользователь создан')
		} catch (e) {
			res.status(500).message('Something went wrong')
		}
	})

router.post(
	'/login',
	[
		check({ 'email': 'Введите корректный email' }).normalizeEmail().isEmail(),
		check({ 'password': 'Мало, очень мало знаков, КАРЛ!' }).exists()
	],
	async (req, res) => {
		try {
			const { body: { email, password } } = req
			const errors = validationResult(req)
			
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некоректные данные при входе в систему',
				})
			}
			
			const user = User.findOne({ email })
			if (!user) {
				return res.status(400).message('Такой пользователь не найден!')
			}
			const isMatchPasswords = await bcrypt.compare(password, user.password)
			
			if (!isMatchPasswords) {
				return res.status(400).message('Неверный пароль, братик')
			}
			
			const token = jwt.sign(
				{ userId: user.id },
				config.get('jwtSecret'),
				{ expiresIn: '2h' }
			)
			
			res.json({ token, userId: user.id })
		} catch (e) {
			res.status(500).message('Something went wrong')
		}
	})

module.exports = router