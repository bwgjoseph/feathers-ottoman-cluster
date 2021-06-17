# feathers-ottoman-demo

This project is used for testing feathers service against `feathers-ottoman` database adapter

## Prerequisite

1. Navigate to `/docker-compose`
2. Run `docker-compose up -d`
3. Wait 5-10 sec for all services to fully initialized
4. Launch a command prompt and run `docker exec -it couchbase bash`
5. Once inside the container, run `cd scripts` then `./setup-couchbase.sh`, type `y` if prompted. See details below
6. You can now access couchbase via `localhost:8091` and login using `admin:password`

### setup-couchbase.sh

This script will initialize and setup couchbase node and cluster using the couchbase-cli, hence, no manual setup is required. It will:

1. Initialize the node with `admin:password` credentials
2. Initialize the cluster with only `data, index, query, fts` services enabled
3. Create `user:password` with `full admin` rights
4. Creates a bucket: `testBucket`
5. Creates a scope: `testScope` under `testBucket`
6. Creates a collection: `testCollection` under `testScope`

## Run

1. Run `npm run dev` to start the feathers server

## Local Development Setup

1. Clone [feathers-ottoman](https://github.com/bwgjoseph/feathers-ottoman) to your local directory
2. Navigate to the root directory of `feathers-ottoman`
3. Run `npm link`
4. Navigate back to root directory of `feathers-ottoman-demo`
5. Run `npm link feathers-ottoman`

## Showcase

1. [Extend Schema](https://ottomanjs.com/guides/schema.html#extend-schemas) - See `base.schema.ts`
2. Upload attachment via `attachments` service - See `/public/index.html`
   1. Navigate to `localhost:3030`, select your file (image) to upload, and the image on screen will change upon uploaded
   2. This works by converting the uploaded file into `base64` string and store into the database
