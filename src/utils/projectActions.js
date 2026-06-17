export function getProjectActions(project) {
  const githubUrl = typeof project.githubUrl === 'string' ? project.githubUrl.trim() : ''
  const liveUrl = typeof project.liveUrl === 'string' ? project.liveUrl.trim() : ''

  const hasPublicRepo = project.privateRepo === false && githubUrl !== ''
  const hasLiveDemo = liveUrl !== ''
  const hasActions = hasPublicRepo || hasLiveDemo

  return { hasPublicRepo, hasLiveDemo, hasActions }
}
