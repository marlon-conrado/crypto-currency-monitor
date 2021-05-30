import { app, express, environment } from '../common';

export const bootServer = () => {
  app.use(express.json({ limit: '50mb' }));

  app.listen(environment.port, () => {
    console.log(`Listen on port ${environment.port}`);
  });
};
