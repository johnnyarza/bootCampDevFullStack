import React, { Component } from 'react';

export default class band extends Component {
  constructor() {
    super();
    this.state = {
      bandName: 'Rush',
      bandMembers: [
        {
          id: 1,
          name: 'Neil Peart',
          instrument: 'Bateria',
        },
        {
          id: 2,
          name: 'Alex Lifestone',
          instrument: 'Guitarra',
        },
        {
          id: 3,
          name: 'Geddy Lee',
          instrument: 'Baixo',
        },
      ],
    };
  }

  render() {
    const { bandName, bandMembers } = this.state;
    return (
      <div>
        <h4>{this.state.bandName}</h4>
        <ul>
          {bandMembers.map(({ id, name, instrument }) => {
            return (
              <li key={id}>
                {name} - {instrument}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
