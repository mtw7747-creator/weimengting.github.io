/* oxlint-disable jsx-a11y/media-has-caption -- The original song is presented as an audio production asset. */
import Image from 'next/image';
import type { ProjectProduction } from '@/data/projects';

export function CreativeProduction({ production }: { production: ProjectProduction }) {
  return (
    <section className="creative-production-v13" aria-labelledby="production-assets-title">
      <header className="creative-production-heading-v13">
        <div>
          <span>PRODUCTION ASSETS / 创作资产</span>
          <h3 id="production-assets-title">{production.title}</h3>
        </div>
        <p>{production.subtitle}</p>
      </header>

      <section className="production-unit-v13 production-prompt-v13" aria-labelledby="video-prompt-title">
        <div className="production-unit-index-v13">
          <span>01</span>
          <p>VIDEO PROMPT</p>
        </div>
        <div className="production-unit-content-v13">
          <header>
            <h4 id="video-prompt-title">视频生成提示词</h4>
            <span>{production.videoPrompt.nodeCount}</span>
          </header>
          <div className="production-prompt-excerpt-v13">
            {production.videoPrompt.excerpt.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <a className="production-download-v13" href={production.videoPrompt.download} download>
            下载完整 22 节点提示词 <span>↓</span>
          </a>
        </div>
      </section>

      <section className="production-unit-v13 production-characters-v13" aria-labelledby="character-assets-title">
        <div className="production-unit-index-v13">
          <span>02</span>
          <p>CHARACTER SYSTEM</p>
        </div>
        <div className="production-unit-content-v13">
          <header>
            <h4 id="character-assets-title">人物角色资产图与提示词</h4>
            <span>{production.characters.length} 组代表资产</span>
          </header>
          <blockquote className="character-prompt-base-v13">
            <span>角色资产母提示词</span>
            <p>{production.characterPromptBase}</p>
          </blockquote>
          <div className="character-assets-grid-v13">
            {production.characters.map((character) => (
              <article className="character-asset-v13" key={`${character.name}-${character.stage}`}>
                <div className="character-asset-media-v13">
                  <Image
                    src={character.image}
                    alt={`${character.name}${character.stage}角色资产图`}
                    fill
                    sizes="(max-width: 760px) 46vw, (max-width: 1100px) 28vw, 22vw"
                  />
                </div>
                <div className="character-asset-copy-v13">
                  <span>{character.stage}</span>
                  <h5>{character.name}</h5>
                  <p>{character.prompt}</p>
                </div>
              </article>
            ))}
          </div>
          <a className="production-download-v13" href={production.assetNotesDownload} download>
            下载角色与资产连续性清单 <span>↓</span>
          </a>
        </div>
      </section>

      <section className="production-unit-v13 production-song-v13" aria-labelledby="song-title">
        <div className="production-unit-index-v13">
          <span>03</span>
          <p>ORIGINAL SONG</p>
        </div>
        <div className="production-unit-content-v13 production-song-content-v13">
          <header>
            <div>
              <h4 id="song-title">歌曲文件</h4>
              <p>{production.song.title}</p>
            </div>
            <span>{production.song.duration} / {production.song.format}</span>
          </header>
          <audio controls preload="metadata">
            <source src={production.song.src} type="audio/mpeg" />
          </audio>
          <a className="production-download-v13" href={production.song.src} download>
            下载歌曲文件 <span>↓</span>
          </a>
        </div>
      </section>
    </section>
  );
}
