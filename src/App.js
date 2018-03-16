import React, { Component } from 'react';
import add from './ic_add_black_24px.svg'
import remove from './ic_remove_black_24px.svg'
import addGray from './ic_add_gray_24px.svg'
import removeGray from './ic_remove_gray_24px.svg'
import './App.css';
import InlineEditable from "react-inline-editable-field";

class App extends Component {
  constructor(){
    super();

    this.state = {
      addicts: 0,
      money: 0,
      users: 1,
      mpt: 1,
      mpa: 3,
      upt: 1,
      apt: 0
    };

    this.updateMPT = this.updateMPT.bind(this);
    this.updateMPA = this.updateMPA.bind(this);
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

  updateMPA(mValue){
    this.setState({
        mpa: mValue
    });
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

    let addictsToAdd = this.state.users + this.state.upt < this.state.apt ? this.state.users + this.state.upt : this.state.apt;

    this.setState({
      addicts: this.state.addicts + addictsToAdd,
      users: this.state.users + this.state.upt - addictsToAdd,
      money: this.state.money + this.state.mpt * (this.state.users + this.state.upt - addictsToAdd) + this.state.mpa * (this.state.addicts + addictsToAdd),
    });
  }

  render() {
    return (
      <div className="App">
        <div className="CircularBackground">
            <InlineEditable
                content={this.state.money !== 0 ? this.state.money : '0'}
                onBlur={(val, isChanged)=>{
                    //Checks if changed and if it is a number
                    if (isChanged && val === '' + parseInt(val, 10)) {
                        this.setState({money: parseInt(val, 10)});
                    }
                }}
                inputStyle={{marginTop:"-5px", width:"100px", fontSize:"1em", textAlign:"center",
                    marginBottom:"0px", backgroundColor:"transparent", border:"none",
                    fontFamily:"Helvetica Neue, sans-serif", fontWeight:"500", color:"#F2F2F2"}}
                inputWidth='15px'
                inputHeight='15px'
                style={{fontSize: "2em", marginTop:"48px", marginBottom:"5px"}}/>
          <div>Money</div>
        </div>
        <div style={{width:"200px", height:"20px", float:"left", marginTop:"20px", paddingRight:"30px", marginRight:"-30px"}}>
          <div style={{float:"left", display:"inline-block"}}>Addicts:</div>
          <div style={{float:"right", width:"100px", display:"flex", flexDirection:"row", alignItems:"stretch", justifyContent:"space-between"}}>
            <button className="SmallSelectionButton" onClick={()=>this.setState({addicts:this.state.addicts > 0 ? this.state.addicts - 1 : 0})}><img style={SmallImageStyle} src={removeGray}/></button>
              <InlineEditable
                  content={this.state.addicts !== 0 ? this.state.addicts : '0'}
                  onBlur={(val, isChanged)=>{
                      //Checks if changed and if it is a number
                      if (isChanged && val === '' + parseInt(val, 10)) {
                          this.setState({addicts: parseInt(val, 10)});
                      }
                  }}
                  inputStyle={{marginTop:"-5px", width:"40px", fontSize:"1em", textAlign:"center",
                      marginBottom:"0px", backgroundColor:"#DBDBDB", border:"none",
                      fontFamily:"Helvetica Neue, sans-serif", fontWeight:"500", color:"#4F4F4F"}}
                  inputWidth='15px'
                  inputHeight='15px'/>
            <button className="SmallSelectionButton" onClick={()=>this.setState({addicts:this.state.addicts + 1})}><img style={SmallImageStyle} src={addGray}/></button>
          </div>
        </div>
        <div style={{width:"200px", height:"20px", float:"left", marginTop:"10px"}}>
          <div style={{float:"left", display:"inline-block"}}>Players:</div>
          <div style={{float:"right", width:"100px", display:"flex", flexDirection:"row", alignItems:"stretch", justifyContent:"space-between"}}>
            <button className="SmallSelectionButton" onClick={()=>this.setState({users:this.state.users > 0 ? this.state.users - 1 : 0})}><img style={SmallImageStyle} src={removeGray}/></button>
              <InlineEditable
                  content={this.state.users !== 0 ? this.state.users : '0'}
                  onBlur={(val, isChanged)=>{
                      //Checks if changed and if it is a number
                      if (isChanged && val === '' + parseInt(val, 10)) {
                          this.setState({users: parseInt(val, 10)});
                      }
                  }}
                  inputStyle={{marginTop:"-5px", width:"40px", fontSize:"1em", textAlign:"center",
                      marginBottom:"0px", backgroundColor:"#DBDBDB", border:"none",
                      fontFamily:"Helvetica Neue, sans-serif", fontWeight:"500", color:"#4F4F4F"}}
                  inputWidth='15px'
                  inputHeight='15px'/>
            <button className="SmallSelectionButton" onClick={()=>this.setState({users:this.state.users + 1})}><img style={SmallImageStyle} src={addGray}/></button>
          </div>
        </div>
        <div style={{width:"300px", height:"170px", display:"flex", flexDirection:"row", alignItems:"stretch", justifyContent:"space-between", marginTop:"40px"}}>
          <div style={{width:"70px", height:"180px"}}>
            <div style={SubTitleStyle}>Money Per Player</div>
            <Buttons action={this.updateMPT} base={this.state.mpt}></Buttons>
          </div>
          <div style={{width:"75px", height:"180px"}}>
              <div style={SubTitleStyle}>Money Per Addict</div>
              <Buttons action={this.updateMPA} base={this.state.mpa}/>
          </div>
          <div style={{width:"68px", height:"170px"}}>
            <div style={SubTitleStyle}>Players Per Turn</div>
            <Buttons action={this.updateUPT} base={this.state.upt}/>
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
      num: this.props.base || '0'
    };
  }

  render(){
    return (
      <div>
        <button className="SelectionButton" onClick={()=>{
          let next;
          //Apparently this library can't display 0 it can only display '0'
          if(this.state.num !== '0') {
            next = this.state.num + 1;
          } else {
            next = 1;
          }
          this.props.action(next);
          this.setState({num: next});
        }}><img style={ImageStyle} src={add}/></button>
        <InlineEditable
            content={this.state.num}
            onBlur={(val, isChanged)=>{
              //Checks if changed and if it is a number
              if (isChanged && val === '' + parseInt(val, 10)) {
                this.setState({num: parseInt(val, 10)});
                this.props.action(parseInt(val, 10))
              }
            }}
            inputStyle={{marginTop:"-5px", width:"40px", fontSize:"1em", textAlign:"center",
              marginBottom:"0px", backgroundColor:"#DBDBDB", border:"none",
              fontFamily:"Helvetica Neue, sans-serif", fontWeight:"500", color:"#4F4F4F"}}
            inputWidth='15px'
            inputHeight='15px'
            style={{fontSize:"1.5em", textAlign:"center", marginTop:"0px", marginBottom:"0px"}}/>
        <button className="SelectionButton" onClick={()=>{
          let next = this.state.num > 0 ? this.state.num - 1 : 0;
          this.props.action(next);

          if (next === 0) {
            this.setState({num: '0'})
          } else {
            this.setState({num: next})
          }
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
