import { useState } from 'react';
import Img from './Img.jsx';
import Icon from './Icons.jsx';
import { waLink } from '../lib/whatsapp.js';

export default function RoomCard({ room }) {
  const [i, setI] = useState(0);
  const price = room.price ? `From ₹${Number(room.price).toLocaleString('en-IN')} / night` : 'Rates on request';
  return (
    <article className="room">
      <div className="room-media">
        <div className="room-stage">
          {room.images.map((im, idx) => (
            <Img key={im.name} name={im.name} alt={im.alt} sizes="(max-width: 900px) 100vw, 60vw" eager={idx === 0}
              className={'room-img' + (idx === i ? ' is-active' : '')} />
          ))}
          <span className="room-badge">{room.category}</span>
        </div>
        <div className="room-thumbs" role="tablist" aria-label={`${room.title} photos`}>
          {room.images.map((im, idx) => (
            <button key={im.name} role="tab" aria-selected={idx === i} aria-label={`Show photo ${idx + 1}`} className={'room-thumb' + (idx === i ? ' is-active' : '')} onClick={() => setI(idx)}>
              <Img name={im.name} alt="" sizes="160px" />
            </button>
          ))}
        </div>
      </div>
      <div className="room-body">
        <h3>{room.title}</h3>
        <p>{room.blurb}</p>
        <ul className="room-features">
          {room.features.map((f) => <li key={f}><Icon name="check" size={16} /> {f}</li>)}
        </ul>
        <div className="room-meta"><span>{room.capacity}</span><span>{room.bed}</span></div>
        <div className="room-foot">
          <strong className="room-price">{price}</strong>
          <a className="btn btn--primary" href={waLink(`Hello! I'd like to enquire about the ${room.title}.`)} target="_blank" rel="noreferrer">
            Enquire on WhatsApp <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}
