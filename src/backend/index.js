import { Server, Model } from 'miragejs';

//routes
import spiceRoutes from './spices/routes';
import blendRoutes from './blends/routes';

//data
import spices from './spices/data';
import blends from './blends/data';

export default function makeServer() {
  const server = new Server({
    models: {
      spice: Model,
      blend: Model,
    },

    routes() {
      this.namespace = '/api';

      //spices
      this.get('/v1/spices', spiceRoutes.getSpices);
      this.get('/v1/spices/2', spiceRoutes.errorSpice);
      this.get('/v1/spices/:id', spiceRoutes.getSpice);
      this.put('/v1/spices/:id', spiceRoutes.updateSpice);

      //blends
      this.get('/v1/blends', blendRoutes.getBlends);
      this.get('/v1/blends/:id', blendRoutes.getBlend);
      this.post('/v1/blends', blendRoutes.addBlend);
    },
  });

  server.db.loadData({
    spices,
    blends,
  });

  return server;
}
