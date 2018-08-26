# Neighborhood Coffee map Project

The project is part of Udacity's React Fundamentals course and is the final project of Udacity Front-End Nanodegree that display various locations from Timisoara, Romania, where is served good coffee.

## Project Overview

This project is a single page application featuring a map of my neighborhood I would like to visit. This map has several functionalities, like including highlighted locations, third-party data about those locations and various ways to browse the content.

## What I learn

To use React JavaScript library for building UI and implement third-party APIs that provide valuable data sets that can improve the quality of application and how to handle asynchronicity and errors.

## Getting Started

Clone the [repository](https://github.com/gabrielrm/neighborhood-coffee-map.git) or [download](https://github.com/gabrielrm/neighborhood-coffee-map/archive/master.zip) the zip-file of the master branch.

### Prerequisites

[Node.js](https://nodejs.org/en/) allready installed

### Installing

To get started developing right away: Using your terminal/command line, get inside the folder where these project files are kept: cd /path/to/the/project.

- install project dependencies: `npm install`

#### To run in developer build mode, with service worker not implemented

- start the development server: `npm start`

## Important

The service worker is only implemented during production build mode!

#### To run in production build mode and get a WORKING service worker

- create production build with `npm run build`
- install server `npm install -g serve`
- start server `serve -s build`
- browse to `http://localhost:5000`

### Dependencies

- [React JavaScript library](https://reactjs.org/)
- [Create React App](https://github.com/facebook/create-react-app)
- [axios](https://www.npmjs.com/package/axios).

### API

This project fetches location data from [Foursquare API](https://developer.foursquare.com/) and the map from [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial).