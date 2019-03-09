// This will be our drag source

import React,{Component} from 'react';
import { DragSource,DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

const itemSource = {
    beginDrag(props){
        return props.item
    },
    endDrag(props, monitor,component){
        if(!monitor.didDrop()){
            return
        }
        return props.handleDrop(props.item.id, props.item.name);
    },
    isDragging(props, monitor){
        return true 
    }
}


const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
        draggedItem:monitor.getItem()

    }
}

const collectTarget = (connect, monitor) => {
    return {
         connectDropTarget : connect.dropTarget(),
         hovered: monitor.isOver(),
         itemT:monitor.getDropResult(),

    }
}

const itemTarget = {
    drop(props, monitor, component){
        const droppedTarget = props.item;
        return props.addChild(props.draggedItem, props.item)
    }
}

class Item extends Component{
    render(){
        const {connectDragSource,item,isDragging,connectDropTarget,draggedItem } = this.props;
        return connectDragSource(connectDropTarget(
            <div className='item' style={{backgroundColor:'cadetblue', display:isDragging&&draggedItem.id===item.id?'none':'block'}} >
            {item.name}
            {
                item.children.length>0?(
                    <div className='item'>
                    {
                        item.children.map((val)=>{
                            return (
                                <p>{val.name}</p>
                            )
                        })
                    }
                    </div>
                ):null
            }
            </div>
        ))
    }
}

// export default DragSource()(Item); 
export default flow(
    DropTarget('item', itemTarget,collectTarget),
    DragSource('item',itemSource, collect)
  )(Item);