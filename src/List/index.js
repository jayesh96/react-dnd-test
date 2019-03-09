import React, { Component } from "react";
import Item from "./Item.js";
import Target from "./Target.js";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import logo from "../logo.svg";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: "1", name: "First", children:[] },
        { id: "2", name: "Two" , children:[] },
        { id: "3", name: "Three" , children:[] },
        { id: "4", name: "Four", children:[] },
      ],
      movedItems: []
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.addChild = this.addChild.bind(this);
  }

  deleteItem(id, name) {
    const { items, movedItems } = this.state;
    this.setState({
      items: items.filter(item => {
        return item.id !== id;
      })
    });

    this.setState({ movedItems: [...movedItems, { id: id, name: name }] });
  }

  handleDrop(id, name) {
    return this.deleteItem(id, name);
  }

//   getItems(targetId){
//     const { items } = this.state;
//     return items.filter(item => {
//         return item.id===targetId
//     })[0]
//   } 

  addChild(draggedItem, item) {
    console.log(draggedItem.name + " dragged to " + item.name);
    const items = this.state.items.map((_item, index)=>{
        if(_item.id===item.id){
            return (
                {
                    id:_item.id,
                    name:_item.name,
                    children:[..._item.children,{id:draggedItem.id, name:draggedItem.name}]
                }
            )
        }else{
            return (
                {
                    id:_item.id,
                    name:_item.name,
                    children:[..._item.children]
                }
            )
        }
        
    })
    this.setState({items})
    return { targetItem: item };
  }

  render() {
    const { items, movedItems } = this.state;
    console.log(this.state.items,"-------->")
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-intro">
          <div className="app-container">
            <div className="item-container">
              {items.map((item, index) => {
                return (
                  <React.Fragment>
                    <Item
                      key={index}
                      item={item}
                      handleDrop={this.handleDrop}
                      addChild={this.addChild}
                    />
                  </React.Fragment>
                );
              })}
            </div>
            {
              // <Target movedItems = {movedItems} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(List);
