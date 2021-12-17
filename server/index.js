const chalk = require('chalk');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Logging middleware
app.use(
  morgan(function (tokens, req, res) {
    return [
      '\n',
      chalk.bold.red('->'),
      chalk.bold.yellow(tokens.method(req, res)),
      chalk.bold.cyan(tokens.status(req, res)),
      chalk.bold.magenta(tokens.url(req, res)),
      chalk.bold.green(tokens['response-time'](req, res) + ' ms'),
    ].join(' ');
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/webpack')));

// Send index.html as default
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(chalk.bold.inverse.italic.redBright(`\n v v v Error v v v `));
  console.log(chalk.bold.red(err));
  console.error(err);
  console.error(err.stack);
  console.log(chalk.bold.inverse.italic.redBright(` ^ ^ ^ Error ^ ^ ^ \n`));
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

// Server
const PORT = process.env.PORT || 5000; // Heroku compatible
const startServer = async () => {
  app.listen(PORT, () => {
    console.log(
      chalk.bold.cyan(`\nServer listening on`),
      chalk.bold.blue(`http://localhost:${PORT}/`)
    );
  });
};
startServer();

// End server
process.once('SIGINT', () => {
  console.log(chalk.bold.red('\n\nGracefully shutting down server\n'));
  process.kill(process.pid, 'SIGUSR2');
});
