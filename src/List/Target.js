import React,{Component} from 'react';
import {DropTarget} from 'react-dnd';

const collect = (connect, monitor) => {
    return {
         connectDropTarget : connect.dropTarget(),
         hovered: monitor.isOver(),
         item:monitor.getItem(),
    }
}

class Target extends Component{
    render(){
        // console.log(this.props.,'-')
        const {connectDropTarget, hovered, item,} = this.props;
        const backgroundColor = hovered?'green':'#e4e4e4';

        return connectDropTarget(
            <div className='target' style={{backgroundColor}}>
            Target
            </div>
        )
    }
}

export default DropTarget('item', {}, collect)(Target);