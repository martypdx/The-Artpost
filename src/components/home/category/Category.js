import html from './category.html';
import './category.css';
import Template from '../../Template';

const template = new Template(html);

export default class Category {

  render() {
    const dom = template.clone();
    
    return dom;
  }
    
  unrender() {
    
  }
}