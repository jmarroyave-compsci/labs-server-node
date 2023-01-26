import express from "express";
import { getResourcePath } from 'common/files';
import serveIndex from 'serve-index';

export const init =  ( app ) => {
  app.use('/repos', express.static( getResourcePath("repos") ), serveIndex(__dirname + '/files/repos'));
}
