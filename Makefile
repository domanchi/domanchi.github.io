VENV=blah

.PHONY: watch
watch: venv
	bundle exec jekyll serve

# watch-fast doesn't handle new files / routing changes well.
.PHONY: watch-fast
watch-fast: venv
	bundle exec jekyll serve --incremental

venv:
	virtualenv ${VENV}
	./scripts/setup-virtual-gems.sh ${VENV}