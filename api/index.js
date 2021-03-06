const express = require("express")

// Create express instnace
const app = express()

// Require API routes
const files = require("./routes/files")

// Import API Routes
app.use(files)

// Export the server middleware
module.exports = {
  path: "/api",
  handler: app
}
