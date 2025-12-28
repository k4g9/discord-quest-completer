import "./style.css";

import { HeaderBarButton } from "@api/HeaderBar";
import { showNotification } from "@api/Notifications";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { Devs } from "@utils/constants";
import { findComponentByCodeLazy } from "@webpack";

const QuestIcon = findComponentByCodeLazy("10.47a.76.76");

function runQuestLogic() {
    

delete window.$;
let wpRequire = webpackChunkdiscord_app.push([[Symbol()], {}, r => r]);
webpackChunkdiscord_app.pop();

let ApplicationStreamingStore = Object.values(wpRequire.c).find(x => x?.exports?.Z?.__proto__?.getStreamerActiveStreamMetadata).exports.Z;
let RunningGameStore = Object.values(wpRequire.c).find(x => x?.exports?.ZP?.getRunningGames).exports.ZP;
let QuestsStore = Object.values(wpRequire.c).find(x => x?.exports?.Z?.__proto__?.getQuest).exports.Z;
let ChannelStore = Object.values(wpRequire.c).find(x => x?.exports?.Z?.__proto__?.getAllThreadsForParent).exports.Z;
let GuildChannelStore = Object.values(wpRequire.c).find(x => x?.exports?.ZP?.getSFWDefaultChannel).exports.ZP;
let FluxDispatcher = Object.values(wpRequire.c).find(x => x?.exports?.Z?.__proto__?.flushWaitQueue).exports.Z;
let api = Object.values(wpRequire.c).find(x => x?.exports?.tn?.get).exports.tn;

let quest = [...QuestsStore.quests.values()].find(x => x.id !== "1412491570820812933" && x.userStatus?.enrolledAt && !x.userStatus?.completedAt && new Date(x.config.expiresAt).getTime() > Date.now())
let isApp = typeof DiscordNative !== "undefined"
if(!quest) {
	showNotification({
                    title: `You don't have any uncompleted quests!`,
                    body: `Please make sure you have a quest selected.`,
					dismissOnClick: false,
                })
} else {
	const pid = Math.floor(Math.random() * 30000) + 1000
	
	const applicationId = quest.config.application.id
	const applicationName = quest.config.application.name
	const questName = quest.config.messages.questName
	const taskConfig = quest.config.taskConfig ?? quest.config.taskConfigV2
	const taskName = ["WATCH_VIDEO", "PLAY_ON_DESKTOP", "STREAM_ON_DESKTOP", "PLAY_ACTIVITY", "WATCH_VIDEO_ON_MOBILE"].find(x => taskConfig.tasks[x] != null)
	const secondsNeeded = taskConfig.tasks[taskName].target
	let secondsDone = quest.userStatus?.progress?.[taskName]?.value ?? 0


	// WATCH_VIDEO
	if(taskName === "WATCH_VIDEO" || taskName === "WATCH_VIDEO_ON_MOBILE") {
		const maxFuture = 10, speed = 7, interval = 1
		const enrolledAt = new Date(quest.userStatus.enrolledAt).getTime()
		let completed = false

		let fn = async () => {			
			while(true) {
				const maxAllowed = Math.floor((Date.now() - enrolledAt)/1000) + maxFuture
				const diff = maxAllowed - secondsDone
				const timestamp = secondsDone + speed
				if(diff >= speed) {
					const res = await api.post({url: `/quests/${quest.id}/video-progress`, body: {timestamp: Math.min(secondsNeeded, timestamp + Math.random())}})
					completed = res.body.completed_at != null
					secondsDone = Math.min(secondsNeeded, timestamp)
				}
				
				if(timestamp >= secondsNeeded) {
					break
				}
				await new Promise(resolve => setTimeout(resolve, interval * 1000))
			}

			if(!completed) {
				await api.post({url: `/quests/${quest.id}/video-progress`, body: {timestamp: secondsNeeded}})
			}
			showNotification({
                    title: `Quest completed!`,
                    body: `${questName} - WATCH_VIDEO quest was successfully completed.`,
					dismissOnClick: false,
                })
		}
		fn()
		showNotification({
                    title: `Spoofing video for: ${questName}.`,
                    body: `❤️ Better Quest Completer`,
					dismissOnClick: false,
                })

	// PLAY_ON_DESKTOP
	} else if(taskName === "PLAY_ON_DESKTOP") {
		if(!isApp) {
			showNotification({
                    title: `Use the desktop app to complete the: ${applicationName} quest!`,
                    body: `This no longer works in browser for non-video quests.`,
					dismissOnClick: false,
			})
		} else {
			api.get({url: `/applications/public?application_ids=${applicationId}`}).then(res => {
				const appData = res.body[0]
				const exeName = appData.executables.find(x => x.os === "win32").name.replace(">","")
				
				const fakeGame = {
					cmdLine: `C:\\Program Files\\${appData.name}\\${exeName}`,
					exeName,
					exePath: `c:/program files/${appData.name.toLowerCase()}/${exeName}`,
					hidden: false,
					isLauncher: false,
					id: applicationId,
					name: appData.name,
					pid: pid,
					pidPath: [pid],
					processName: appData.name,
					start: Date.now(),
				}

				const realGames = RunningGameStore.getRunningGames()
				const fakeGames = [fakeGame]
				const realGetRunningGames = RunningGameStore.getRunningGames
				const realGetGameForPID = RunningGameStore.getGameForPID
				RunningGameStore.getRunningGames = () => fakeGames
				RunningGameStore.getGameForPID = (pid) => fakeGames.find(x => x.pid === pid)
				FluxDispatcher.dispatch({type: "RUNNING_GAMES_CHANGE", removed: realGames, added: [fakeGame], games: fakeGames})
				
				let fn = data => {
					let progress = quest.config.configVersion === 1 ? data.userStatus.streamProgressSeconds : Math.floor(data.userStatus.progress.PLAY_ON_DESKTOP.value)
					console.log(`Quest progress: ${progress}/${secondsNeeded}`)
					console.log(`Quest progress: ${progress}/${secondsNeeded}`)
					console.log(`Quest progress: ${progress}/${secondsNeeded}`)
					
					if(progress >= secondsNeeded) {
						showNotification({
                    title: `Quest completed!`,
                    body: `${applicationName} - PLAY_ON_DESKTOP quest was successfully completed.`,
					dismissOnClick: false,
					})
						
						RunningGameStore.getRunningGames = realGetRunningGames
						RunningGameStore.getGameForPID = realGetGameForPID
						FluxDispatcher.dispatch({type: "RUNNING_GAMES_CHANGE", removed: [fakeGame], added: [], games: []})
						FluxDispatcher.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn)
					}
				}
				FluxDispatcher.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn)
				
				showNotification({
                    title: `Spoofed your game to: ${applicationName}.`,
                    body: `Wait for ${Math.ceil((secondsNeeded - secondsDone) / 60)} more minutes.`,
					dismissOnClick: false,
                })
			})
		}

	// STREAM_ON_DESKTOP
	} else if(taskName === "STREAM_ON_DESKTOP") {
		if(!isApp) {
			showNotification({
                    title: `Use the desktop app to complete the ${applicationName} quest!`,
                    body: `This no longer works in browser for non-video quests.`,
					dismissOnClick: false,
					})
		} else {
			let realFunc = ApplicationStreamingStore.getStreamerActiveStreamMetadata
			ApplicationStreamingStore.getStreamerActiveStreamMetadata = () => ({
				id: applicationId,
				pid,
				sourceName: null
			})
			
			let fn = data => {
				let progress = quest.config.configVersion === 1 ? data.userStatus.streamProgressSeconds : Math.floor(data.userStatus.progress.STREAM_ON_DESKTOP.value)
				console.log(`Quest progress: ${progress}/${secondsNeeded}`)
				console.log(`Quest progress: ${progress}/${secondsNeeded}`)
				console.log(`Quest progress: ${progress}/${secondsNeeded}`)
				
				if(progress >= secondsNeeded) {
					showNotification({
                    title: `Quest completed!`,
                    body: `${questName} - STREAM_ON_DESKTOP quest was successfully completed.`,

					dismissOnClick: false,
					})
					
					ApplicationStreamingStore.getStreamerActiveStreamMetadata = realFunc
					FluxDispatcher.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn)
				}
			}
			FluxDispatcher.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn)
			
			showNotification({
                    title: `Spoofed your stream to ${applicationName}. Stream any window in voice channel for ${Math.ceil((secondsNeeded - secondsDone) / 60)} more minutes.`,
                    body: `Remember that you need at least 1 other person to be in the voice channel!`,
					dismissOnClick: false,
					})
		}

	// PLAY_ACTIVITY
	} else if(taskName === "PLAY_ACTIVITY") {
		const channelId = ChannelStore.getSortedPrivateChannels()[0]?.id ?? Object.values(GuildChannelStore.getAllGuilds()).find(x => x != null && x.VOCAL.length > 0).VOCAL[0].channel.id
		const streamKey = `call:${channelId}:1`
		
		let fn = async () => {
			showNotification({
                    title: `Completing quest: ${applicationName} - ${questName}`,
                    body: `❤️ Better Quest Completer`,
					dismissOnClick: false,
					})
			
			while(true) {
				const res = await api.post({url: `/quests/${quest.id}/heartbeat`, body: {stream_key: streamKey, terminal: false}})
				const progress = res.body.progress.PLAY_ACTIVITY.value
				console.log(`Quest progress: ${progress}/${secondsNeeded}`)
				console.log(`Quest progress: ${progress}/${secondsNeeded}`)
				console.log(`Quest progress: ${progress}/${secondsNeeded}`)
				
				await new Promise(resolve => setTimeout(resolve, 20 * 1000))
				
				if(progress >= secondsNeeded) {
					await api.post({url: `/quests/${quest.id}/heartbeat`, body: {stream_key: streamKey, terminal: true}})
					break
				}
			}
			
			showNotification({
                    title: `Quest completed!`,
                    body: `${questName} - PLAY_ACTIVITY quest was successfully completed.`,
					dismissOnClick: false,
					})
		}
		fn()
	}
}

}

function QuestButton() {
    return (
        <HeaderBarButton
            tooltip="Better Quest Completer"
            position="bottom"
            className="better-qc-button"
            icon={QuestIcon}
            onClick={runQuestLogic}
        />
    );
}

const settings = definePluginSettings({
    enableNotifications: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Turn notifications on/off",
    },
});

module.exports = definePlugin({
    name: "Better Quest Completer",
    description: "Lightweight and better quest completer\nhttps://github.com/k4g9/discord-quest-completer",
    authors: [
        {
            name: "k4g9 - github.com/k4g9",
            id: "848987722751410206",
		    link: "https://github.com/k4g9",
		},
	        ],
			settings,
	

    headerBarButton: {
        icon: QuestIcon,
        render: QuestButton,
    },
});
