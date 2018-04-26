import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2
  state = {
    information: [
      {
        id: 0,
        name: '정구봉',
        phone: '010-5117-9060'
      },
      {
        id: 1,
        name: '네이버',
        phone: 'naver.com'
      }
    ],
    keyword: ''
  }
  handleCreate = (data) => {
    const {information} = this.state;
    this.setState({
      information: information.concat({id:this.id++, ...data})
    })
  }
  handleRemove = (id) => {
    const {information} = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }
  handleUpdate = (id, data) => {
    const {information} = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
          ? {...info, ...data}
          : info
      )
    }, console.log(this.state)) // 이렇게 하면 콜백이 아닌가? 흠... 
  }
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    });
  }
  render() {
    const {information, keyword} = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    )
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <input
          placeholder="검색할 이름을 입력하세요"
          onChange={this.handleChange}
          value={keyword}
        />
        <PhoneInfoList 
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
          />
      </div>
    )
  }
}
export default App;