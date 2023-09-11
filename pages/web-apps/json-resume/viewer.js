
import Link from "next/link";

import Layout from 'components/Layout/Layout.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import Badge from 'components/Badge/Badge.js'

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

//import myResume from '../../../cv/giorgio-tedesco-resume.json';


export default function Viewer ( { myResume } ) {

  const works = myResume.work;
  const skills = myResume.skills;
  const edu = myResume.education;
  const projects = myResume.projects;
  return(
    <>
      <Layout title='My current CV / Resumé' description={(<Button disabled color='info'>DOWNLOAD MY PDF CV</Button>)} image='scott-graham-OQMZwNd3ThU-unsplash.jpg'>

      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h3>Works</h3>
          <GridContainer justify="center">
            { works.map((work) => {
              let theLink = (<></>);
              if (work.url) {
                theLink = (<Button as="link" color="primary" href={work.url} target="_blank">Go To the website</Button>)
              }
              let today = 'until today';
              if (work.endDate) {
                today = 'until ' + work.endDate;
              }
              return (
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardBody>
                      <h4>
                        { work.name }<br />
                        <small><i>from {work.startDate} {today}</i></small>
                      </h4>
                      <p><Badge color='warning'>{ work.position }</Badge></p>
                      <p>{ work.summary }</p>
                      <p>{ (work.highlights.length > 0) ? work.highlights.map((i) => {
                        return <Badge>{i}</Badge>
                      }) : null }</p>
                      {theLink}
                    </CardBody>
                  </Card>
                </GridItem>
              )
            }) }
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <h3>Skills</h3>
          { skills.map( (skill) => {
            return(<Badge>{skill.name}</Badge>)
          })}<br /><br />
          <h3>Education</h3>
          { edu.map( (edu) => {
            return(
              <Card>
                <CardBody>
                  <h5>{edu.institution}<br/><small>{edu.studyType}</small></h5>
                  <h6><small>{edu.area}</small></h6>
                </CardBody>
              </Card>)
          })}

          <h3>Side Projects</h3>
          { projects.map( (project) => {
            return(
              <Card>
                <CardBody>
                  <h5>{project.name}<br/><small>{edu.studyType}</small></h5>
                  <p>{project.description}</p>
                  <p>{ (project.highlights.length > 0) ? project.highlights.map((i) => {
                        return <Badge>{i}</Badge>
                      }) : null }</p>
                <Button as="link" color="primary" href={project.url} target="_blank">Go To the website</Button>
                </CardBody>
              </Card>)
          })}

        </GridItem>
      </GridContainer>

      </Layout>
    </>
  )

}

export async function getStaticProps(context) {

  const myResume = await require ('../../../cv/giorgio-tedesco-resume.json');

  return {
    props: { myResume }
  }
}
