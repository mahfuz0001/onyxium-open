"use client";

import { Component } from "react";

import { Crisp } from "crisp-sdk-web";

class CrispChat extends Component {
  componentDidMount() {
    Crisp.configure("1e5482a1-6c10-4d68-bbfa-3a6bb6e0c87c");
  }

  render() {
    return null;
  }
}
export default CrispChat;
