# spfx-dfp-explorer

## Summary

A tool for testing API execution against Dataflex Pro (formerly Common Data Services).   
It also contains some sample requests.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.11-green.svg)

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

## How to install

1. Clone this repository
1. Ensure that you are at the solution folder
1. in the command-line run:
  - **npm install**
  - **npm run package**
1. Go to the Azure management portal and select Azure Active Directory> App Registration Screen> All Applications tab, then SharePoint Online Client Extensibility Web Application Principal.   
1. Add Dynamics CRM> user_impersonation on the API permissions screen.
1. Upload spfx-dfp-explorer.sppkg to SharePoint app catalog.(The sppkg file will be created in the {SharePoint} folder when you execute the command **npm run package**)   
1. Add {spfx-dfp-explorer} to your sharepoint site.   
1. Add {Dataflex Pro Explorer} to your site page.

## Features

- Executing Dataflex Pro Web API

You can input method, environtment, endpoint URL, headers, body to test the API.

- Sample requests

Select a sample request and run it quickly.

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**