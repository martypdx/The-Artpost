import Template from '../../Template';
import html from './following.html';
import './following.css';
import ItemsList from '../../itemsList/ItemsList';
import { db, auth } from '../../../services/firebase';

const template = new Template(html);
const itemsByUser = db.ref('itemsByUser');

export default class Following {

  render() {
    const dom = template.clone();

    this.list = new ItemsList(itemsByUser.child(auth.currentUser.uid));
    dom.querySelector('article').appendChild(this.list.render());

    return dom;
  }
}