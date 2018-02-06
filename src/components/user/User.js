import Template from '../Template';
import html from './user.html';
import './user.css';
import Favorites from './favorites/Favorites';
import Following from './following/Following';
import Profile from './profile/Profile';
import Upload from './upload/Upload';
import { removeChildren } from '../dom';
import { auth, db } from '../../services/firebase';

const template = new Template(html);
const itemsByUser = db.ref('itemsByUser');
const users = db.ref('users');

export default class User {

  constructor() {
    this.hashChange = () => this.setChildPage();
    window.addEventListener('hashchange', this.hashChange);
  }

  setChildPage() {
    const routes = window.location.hash.split('/');

    const childPage = routes[1] || '';

    if(this.childPage === childPage) return;

    this.childPage = childPage;
    if(this.childPage && this.childPage.childComponent && this.childPage.childComponent.unrender) this.childPage.childComponent.unrender();
    removeChildren(this.section);

    let childComponent;
    if(childPage === 'upload') childComponent = new Upload();
    else if(childPage === 'favorites') childComponent = new Favorites(itemsByUser.child(auth.currentUser.uid));
    else if(childPage === 'following') childComponent = new Following(childPage);
    else childComponent = new Profile();
    console.log(childPage);

    // this.updateHeader(childPage === 'my');

    this.childComponent = childComponent;
    this.section.appendChild(childComponent.render());
  }

  render() {
    const dom = template.clone();

    // this.header = dom.querySelector('h2');
    this.section = dom.querySelector('section');
    
    dom.querySelector('h2').textContent = users.name;
    

    this.upload = dom.querySelector('.upload-hide');
    users.child(auth.currentUser.uid).once('value', data => {
      if(data.val().isArtist)
        this.upload.classList.remove('upload-hide');
    });

    this.setChildPage();
    
    return dom;
  }

  unrender() {
    window.removeEventListener('hashchange', this.hashChange);
  }
}