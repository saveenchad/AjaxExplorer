# AjaxExplorer
The Super Endpoint Explorer (SEE) app will allow the end user to craft requests to a remote end-point by filling out various form fields, send the request and show the response, and save common request configurations for later playback. The form of the tool is roughly like the Chrome Extension called Postman or an OSX HTTP exploration like Paw but obviously less polished and feature laden.

# How to Git

### Pull the remote repo

(ssh) `git clone git@github.com:saveenchad/AjaxExplorer.git`

(https) `git clone https://github.com/saveenchad/AjaxExplorer.git`

### Make a local dev branch to work on

`git checkout -b dev`

### When you want to commit

`git status` to see which files you have edited

`git add .` to stage the files of the current directory

`git commit -m "INSERT COMMIT MESSAGE HERE"` to commit the staged files

`git checkout master` to go back to master branch that everyone has access to

`git pull origin master` to pull the latest code onto master branch

`git rebase master dev` to put what you just pulled onto your dev branch. Moves you automatically to dev branch. You might get merge conflicts here so just follow the instructions on the console to fix

`git checkout master` to get back to master after rebasing

`git merge master dev` to merge your commits onto master

`git push origin master` to push code to remote repo

`git checkout dev` move back to dev branch to do more work
