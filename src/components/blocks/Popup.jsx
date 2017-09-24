import React from 'react';

export default class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      img: null,
    };
  }
  render() {
    const reader = new FileReader();
    reader.onloadend = function () {
      const image = document.getElementById('preview');
      image.src = reader.result;
      image.style.display = 'block';
    }
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h2>Добавление книги</h2>
          <form onSubmit={e => {
            e.preventDefault();
            this.props.closeAddPopup(this.state);
          }}>
            <label>Название: <input value={this.state.title} onChange={e => this.setState({ title: e.target.value })} type="text" required /></label><br />
            <label>Автор: <input value={this.state.author} onChange={e => this.setState({ author: e.target.value })} type="text" required /></label><br />
            <label>Обложка: <input onChange={e => {
              this.setState({ img: e.target.files[0] });
              reader.readAsDataURL(e.target.files[0]);
            }} accept="image/*" type="file" required /></label><br />
            <img id="preview" alt="preview" /><br />
            <div className="buttons">
              <input type="submit" value="Добавить" />
              <button onClick={() => this.props.closeAddPopup(null)}>Отменить</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
