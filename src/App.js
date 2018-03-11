import React, { Component } from 'react';
import add from './ic_add_black_24px.svg'
import remove from './ic_remove_black_24px.svg'
import addGray from './ic_add_gray_24px.svg'
import removeGray from './ic_remove_gray_24px.svg'
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      addicts: 0,
      money: 0,
      users: 1,
      mpt: 1,
      upt: 0,
      apt: 0
    };

    this.updateMPT = this.updateMPT.bind(this);
    this.updateAPT = this.updateAPT.bind(this);
    this.updateUPT = this.updateUPT.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
  }

  updateMPT(mValue){
    this.setState({
      mpt: mValue
    });

    console.log(mValue)
  }

  updateUPT(mValue){
    this.setState({
      upt: mValue
    });
  }

  updateAPT(mValue){
    this.setState({
      apt: mValue
    });
  }

  nextTurn(){
    this.setState({
      addicts: this.state.addicts + this.state.apt,
      money: this.state.money + this.state.mpt,
      users: this.state.users + this.state.upt
    });
  }

  render() {
    return (
      <div className="App">
        <div className="CircularBackground">
          <h1 style={{fontSize: "2em", marginTop:"48px", marginBottom:"5px"}}>{this.state.addicts}</h1>
          <div>Addicts</div>
        </div>
        <div style={{width:"200px", height:"20px", float:"left", marginTop:"20px", paddingRight:"30px", marginRight:"-30px"}}>
          <div style={{float:"left", display:"inline-block"}}>Money:</div>
          <div style={{float:"right", width:"100px", display:"flex", flexDirection:"row", alignItems:"stretch", justifyContent:"space-between"}}>
            <button className="SmallSelectionButton" onClick={()=>this.setState({money:this.state.money > 0 ? this.state.money - 1 : 0})}><img style={SmallImageStyle} src={removeGray}/></button>
            <div>{this.state.money}</div>
            <button className="SmallSelectionButton" onClick={()=>this.setState({money:this.state.money + 1})}><img style={SmallImageStyle} src={addGray}/></button>
          </div>
        </div>
        <div style={{width:"200px", height:"20px", float:"left", marginTop:"10px"}}>
          <div style={{float:"left", display:"inline-block"}}>Users:</div>
          <div style={{float:"right", width:"100px", display:"flex", flexDirection:"row", alignItems:"stretch", justifyContent:"space-between"}}>
            <button className="SmallSelectionButton" onClick={()=>this.setState({users:this.state.users > 0 ? this.state.users - 1 : 0})}><img style={SmallImageStyle} src={removeGray}/></button>
            <div>{this.state.users}</div>
            <button className="SmallSelectionButton" onClick={()=>this.setState({users:this.state.users + 1})}><img style={SmallImageStyle} src={addGray}/></button>
          </div>
        </div>
        <div style={{width:"220px", height:"170px", display:"flex", flexDirection:"row", alignItems:"stretch", justifyContent:"space-between", marginTop:"40px"}}>
          <div style={{width:"70px", height:"180px"}}>
            <div style={SubTitleStyle}>Money Per Player</div>
            <Buttons action={this.updateMPT} base={1}></Buttons>
          </div>
          <div style={{width:"68px", height:"170px"}}>
            <div style={SubTitleStyle}>Players Per Turn</div>
            <Buttons action={this.updateUPT} base={1}/>
          </div>
          <div style={{width:"68px", height:"170px"}}>
            <div style={SubTitleStyle}>Addicts Per Turn</div>
            <Buttons action={this.updateAPT}/>
          </div>
        </div>
        <button className="NextButton" onClick={this.nextTurn}>
          <div>Next Turn</div>
        </button>
      </div>
    );
  }
}

class Buttons extends Component {
  constructor(props){
    super(props);

    this.state = {
      num: this.props.base || 0
    };
  }

  render(){
    return (
      <div>
        <button className="SelectionButton" onClick={()=>{
          let next = this.state.num + 1;
          this.props.action(next);
          this.setState({num: next});
        }}><img style={ImageStyle} src={add}/></button>
        <h1 style={{fontSize:"1.5em", textAlign:"center", marginTop:"0px", marginBottom:"0px"}}>{this.state.num}</h1>
        <button className="SelectionButton" onClick={()=>{
          let next = this.state.num > 0 ? this.state.num - 1 : 0;
          this.props.action(next);
          this.setState({num: next})
        }}><img style={ImageStyle} src={remove}/></button>
      </div>
    );
  }
}

const SmallImageStyle = {
  width:"24px",
  height:"24px",
  marginTop:"-5px",
  marginLeft:"-5px"
};

const SubTitleStyle = {
  fontSize:"0.85em"
};

const ImageStyle = {
  width:"100%",
  height:"100%",
  borderColor:"#00000000",
};

export default App;
