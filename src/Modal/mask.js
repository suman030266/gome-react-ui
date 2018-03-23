import React,{Component} from 'react';

export default class Mask extends React.Component{
  constructor(props){
    super();
  }
  render(){
    let {clickCb, canClick} = this.props;
    return (
      <div onClick={canClick ? clickCb.bind(this) : null}  className="gome-modal-mask"></div>
    )
  }
}
