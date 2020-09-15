import React from 'react';
import './App.css';

import { BACKEND_PATH } from './constants-service'

interface AppState {
  minmagnitude: number,
  count: number,

  starttimeRef: React.Ref<HTMLInputElement>
  endtimeRef: React.Ref<HTMLInputElement>
  minmagnitudeRef: React.Ref<HTMLInputElement>
  latitudeRef: React.Ref<HTMLInputElement>
  longitudeRef: React.Ref<HTMLInputElement>
  maxradiuskmRef: React.Ref<HTMLInputElement>
}
class App extends React.Component<null, AppState>  {
  state: AppState = {
    minmagnitude: 0,
    count: 0,

    starttimeRef: React.createRef(),
    endtimeRef: React.createRef(),
    minmagnitudeRef: React.createRef(),
    latitudeRef: React.createRef(),
    longitudeRef: React.createRef(),
    maxradiuskmRef: React.createRef(),
  }
  getApiData = e  => {
    e.preventDefault()

    const starttime = this.state.starttimeRef.current.value
    const endtime = this.state.endtimeRef.current.value
    const minmagnitude = this.state.minmagnitudeRef.current.value
    const latitude = this.state.latitudeRef.current.value
    const longitude = this.state.longitudeRef.current.value
    const maxradiuskm = this.state.maxradiuskmRef.current.value

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
          <input type="text" name="starttime" ref={ this.state.starttimeRef } />
          <input type="text" name="endtime" ref={ this.state.endtimeRef } />
          <input type="text" name="minmagnitude" ref={ this.state.minmagnitudeRef } />
          <input type="text" name="latitude" ref={ this.state.latitudeRef } />
          <input type="text" name="longitude" ref={ this.state.longitudeRef } />
          <input type="text" name="maxradiuskm" ref={ this.state.maxradiuskmRef } />

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
