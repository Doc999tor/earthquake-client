import React from 'react';
import './App.css';

import { BACKEND_PATH } from './constants-service'

interface AppState {
  minmagnitude: number,
  count: number,
}
class App extends React.Component<null, AppState>  {
  state: AppState = {
    minmagnitude: 0,
    count: 0,
  }

  starttimeRef = React.createRef<HTMLInputElement>();
  endtimeRef = React.createRef<HTMLInputElement>();
  minmagnitudeRef = React.createRef<HTMLInputElement>();
  latitudeRef = React.createRef<HTMLInputElement>();
  longitudeRef = React.createRef<HTMLInputElement>();
  maxradiuskmRef = React.createRef<HTMLInputElement>();

  getApiData = (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault()

    const starttime = this!.starttimeRef!.current!.value
    const endtime = this!.endtimeRef!.current!.value
    const minmagnitude = this!.minmagnitudeRef!.current!.value
    const latitude = this!.latitudeRef!.current!.value
    const longitude = this!.longitudeRef!.current!.value
    const maxradiuskm = this!.maxradiuskmRef!.current!.value

    const queryParams = serializeQueryString({
      starttime,
      endtime,
      minmagnitude,
      latitude,
      longitude,
      maxradiuskm,
    })

    fetch(`${ BACKEND_PATH }?format=sdf&${ queryParams }`)
      .then(res => res.json())
      .then(data => {
        this.setState({ ...data })
      })
  }
  render () {
    return (
      <>
        <form onSubmit={ this.getApiData }>
          <input type="text" name="starttime" ref={ this.starttimeRef } />
          <input type="text" name="endtime" ref={ this.endtimeRef } />
          <input type="text" name="minmagnitude" ref={ this.minmagnitudeRef } />
          <input type="text" name="latitude" ref={ this.latitudeRef } />
          <input type="text" name="longitude" ref={ this.longitudeRef } />
          <input type="text" name="maxradiuskm" ref={ this.maxradiuskmRef } />

          <input type="submit" />
        </form>
      </>
    );

  }
}

export default App;

function serializeQueryString(body: { [key: string]: any }) {
  return Object.entries(body)
    .map(kv => encodeURIComponent(kv[0]) + '=' + encodeURIComponent(kv[1].toString()))
    .join('&')
}
