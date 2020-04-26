import React, { Fragment } from 'react';
import { Segment } from 'semantic-ui-react';

export default function Footer() {
    return (
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Fragment>
            <p className="text-center">Créé par <a href="https://twitter.com/lassaad">Medlabs</a> pour le suivi du Covis-19 <a href="https://github.com/EBEREGIT/covid-19">Github</a></p>
        </Fragment>
        </Segment>
    )
}
