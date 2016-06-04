import { combineReducers } from 'redux'
import files from './file'
import folders from './folder'
import applets from './applet'
import comments from './comment'
import shares from './share'
import posts from './post'
import pages from './page'
import buildings from './building'
import cells from './cell'
import paths from './path'


const PylonApp = combineReducers({
  files,
  folders,
  applets,
  comments,
  shares,
  posts,
  pages,
  buildings,
  cells,
  paths
});

export default PylonApp;
