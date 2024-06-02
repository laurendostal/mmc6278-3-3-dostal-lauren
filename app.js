require('dotenv').config()
const express = require('express')
const app = express()

// TODO: import the getCityInfo and getJobs functions from util.js
const findJobUtils = require('./util')

// TODO: Statically serve the public folder
app.use(express.static('public'))

// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status
app.get('/api/city/:city', async (req, res) => {
    const city = req.params.city
    try {
        const cityInfo = await findJobUtils.getCityInfo(city)
        const jobsInfo = await findJobUtils.getJobs(city)
        if (cityInfo || jobsInfo) {
            return res.json({cityInfo: cityInfo, jobs: jobsInfo})
        } else {
            return res.status(404).json({error: 'No city info and job found'})
        }
    } catch(err) {
        return res.status(404).json({error: err.message})
    }
})

module.exports = app