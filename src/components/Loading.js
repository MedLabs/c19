import React, { Fragment } from "react";
import { Loader, Dimmer } from "semantic-ui-react";

export default function Loading() {
  return (
    <Fragment>
      <Dimmer active inverted>
        <Loader size="large">Lavez vos mains...</Loader>
      </Dimmer>
    </Fragment>
  );
}
