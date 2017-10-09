import React from 'react';

export class Popup extends React.Component {
  constructor(props) {
    super(props);
    if (props.type === 'add') {
      this.state = {
        title: '',
        author: '',
        img: null,
      };
    } else if (props.type === 'edit') {
      this.state = {
        title: props.data.title,
        author: props.data.author,
        keywords: props.data.keywords,
        img: props.data.img,
      };
    }
  }

  onSubmit = (e) => {
    const { closePopup, type, data = {} } = this.props;
    e.preventDefault();
    closePopup(type, this.state, data._id);
  }

  onCoverChange = (reader, e) => {
    this.setState({ img: e.target.files[0] });
    reader.readAsDataURL(e.target.files[0]);
  }

  closeForm = (e) => {
    e.preventDefault();
    this.props.closePopup(null);
  }

  deleteBook = (e) => {
    e.preventDefault();
    const { closePopup, data = {} } = this.props;
    closePopup('delete', null, data._id);
  }

  render() {
    const { type } = this.props;
    const reader = new FileReader();
    reader.onloadend = function () {
      const image = document.getElementById('preview');
      image.src = reader.result;
      image.style.display = 'block';
    }
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h2>{type === 'add' ? 'Add book' : 'Change book'}</h2>
          <form onSubmit={this.onSubmit}>
            <label>Title: <input value={this.state.title} onChange={e => this.setState({ title: e.target.value })} type="text" required /></label><br />
            <label>Author first name: <input value={this.state.author.firstName} onChange={e => this.setState({ author: { ...this.state.author, firstName: e.target.value } })} type="text" required /></label><br />
            <label>Author last name: <input value={this.state.author.lastName} onChange={e => this.setState({ author: { ...this.state.author, lastName: e.target.value} })} type="text" required /></label><br />
            <label>Keywords: <input value={this.state.keywords} onChange={e => this.setState({ keywords: e.target.value })} type="text" /></label><br />
            <label>Cover: <input onChange={this.onCoverChange.bind(this, reader)} accept="image/*" type="file" required={type === 'add'} /></label><br />
            <img
              src={type === 'edit' ? `/books/${this.props.data.img}` : null}
              id="preview"
              alt="preview"
              style={{
                display: type === 'add' ? 'none' : 'block',
              }}
            /><br />
            <div className="buttons">
              <input type="submit" value="Submit" />
              <button onClick={this.deleteBook}>Delete</button>
              <button onClick={this.closeForm}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
